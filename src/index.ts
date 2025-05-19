import { ponder } from "ponder:registry";
import {
  battles,
  rewardClaims,
  rounds,
  stats,
  agencies,
  gameState,
  grade,
  rewards,
  spies,
  spySnapshots,
  agencyPoints,
  spyPoints,
} from "ponder:schema";

ponder.on("SpyGameABI:Initialized", async ({ event, context }) => {
  // create game state
  await context.db.insert(gameState).values({
    id: 1,
    roundState: "ACTIVE",
  });
  // create stats
  await context.db.insert(stats).values({
    id: 1,
  });

  // create round 0
  await context.db.insert(rounds).values({
    id: 0n,
    state: "ACTIVE",
  });
});

ponder.on("SpyNFTABI:SpyDynamicMint", async ({ event, context }) => {
  // create a spy
  await context.db.insert(spies).values({
    id: event.args.tokenId,
    timestamp: new Date(Number(event.args.timestamp)),
    block: event.block.number,
    mintHash: event.transaction.hash,
    price: event.args.price,
    alive: true,
    staked: false,
    rank: 0,
    xp: 0n,
    consecutiveDefend: 0,
    consecutiveSabotage: 0,
    consecutiveInfiltrate: 0,
    numKills: 0,
    numConverts: 0,
    grade:
      (["E", "D", "C", "B", "A"][event.args.grade] as
        | "E"
        | "D"
        | "C"
        | "B"
        | "A") ?? "E",
    guard: event.args.skills[0],
    saboteur: event.args.skills[1],
    infiltrator: event.args.skills[2],
    espionage: event.args.skills[3],
    cunning: event.args.skills[4],
    persuasion: event.args.skills[5],
    assassin: event.args.skills[6],
    virtuoso: event.args.skills[7],
    merchant: event.args.skills[8],
    immortal: event.args.skills[9],
    efficient: event.args.skills[10],
    stealth: false,
    versatile: false,
  });
});

ponder.on("SpyGameABI:SpyStaked", async ({ event, context }) => {
  // create agency if not exists
  await context.db
    .insert(agencies)
    .values({ address: event.args.owner })
    .onConflictDoNothing();

  // update spy and set action
  const ACTIONS = ["DEFEND", "RECON", "SABOTAGE", "INFILTRATE"] as const;

  // get current spy
  const spy = await context.db.find(spies, { id: event.args.spyId });
  const alreadyStaked = spy?.staked;

  await context.db.update(spies, { id: event.args.spyId }).set({
    staked: true,
    currentAction: ACTIONS[event.args.action] as
      | "DEFEND"
      | "RECON"
      | "SABOTAGE"
      | "INFILTRATE",
    agencyAddress: event.args.owner,
  });

  // increment game state for spies staked
  const action = ACTIONS[event.args.action] as
    | "DEFEND"
    | "RECON"
    | "SABOTAGE"
    | "INFILTRATE";

  const fieldMap = {
    DEFEND: "currentNumDefenders",
    RECON: "currentNumRecons",
    SABOTAGE: "currentNumSaboteurs",
    INFILTRATE: "currentNumInfiltrators",
  } as const;

  const field = fieldMap[action];

  // If already staked, decrement previous action count
  if (alreadyStaked && spy?.currentAction) {
    const prevField = fieldMap[spy.currentAction as keyof typeof fieldMap];
    if (prevField && prevField !== field) {
      await context.db.update(gameState, { id: 1 }).set((row) => ({
        [prevField]: (row[prevField] ?? 1) - 1,
      }));
    }
  }

  await context.db.update(gameState, { id: 1 }).set((row) => ({
    [field]: (row[field] ?? 0) + 1,
  }));
});

ponder.on("SpyGameABI:SpyUnstaked", async ({ event, context }) => {
  // update spy and remove action and agency
  await context.db
    .update(spies, { id: event.args.spyId })
    .set({ staked: false, agencyAddress: null, currentAction: null });

  // decrement game state for spies staked
  const spy = await context.db.find(spies, { id: event.args.spyId });
  const action = spy?.currentAction;
  const fieldMap = {
    DEFEND: "currentNumDefenders",
    RECON: "currentNumRecons",
    SABOTAGE: "currentNumSaboteurs",
    INFILTRATE: "currentNumInfiltrators",
  } as const;
  const field = fieldMap[action as keyof typeof fieldMap];
  if (field === "currentNumDefenders") {
    await context.db.update(gameState, { id: 1 }).set((row) => ({
      currentNumDefenders: (row.currentNumDefenders ?? 1) - 1,
    }));
  } else if (field === "currentNumRecons") {
    await context.db.update(gameState, { id: 1 }).set((row) => ({
      currentNumRecons: (row.currentNumRecons ?? 1) - 1,
    }));
  } else if (field === "currentNumSaboteurs") {
    await context.db.update(gameState, { id: 1 }).set((row) => ({
      currentNumSaboteurs: (row.currentNumSaboteurs ?? 1) - 1,
    }));
  } else if (field === "currentNumInfiltrators") {
    await context.db.update(gameState, { id: 1 }).set((row) => ({
      currentNumInfiltrators: (row.currentNumInfiltrators ?? 1) - 1,
    }));
  }
});

ponder.on("SpyGameABI:GameStartTimeSet", async ({ event, context }) => {
  await context.db
    .update(gameState, { id: 1 })
    .set({ gameStartTime: new Date(Number(event.args.newGameStartTime)) });
});

ponder.on("SpyGameABI:RoundStateChanged", async ({ event, context }) => {
  const ROUND_STATES = [
    "ACTIVE",
    "SHUFFLING",
    "DEFENDERS",
    "RECONS",
    "SABOTEURS",
    "INFILTRATORS",
    "RESOLVED",
  ] as const;

  await context.db.update(gameState, { id: 1 }).set({
    roundState: ROUND_STATES[event.args.newState] as
      | "ACTIVE"
      | "SHUFFLING"
      | "DEFENDERS"
      | "RECONS"
      | "SABOTEURS"
      | "INFILTRATORS"
      | "RESOLVED",
    currentRound: event.args.roundId,
  });

  // if active round is created, create round
  if (event.args.newState == 0) {
    // create round
    await context.db
      .insert(rounds)
      .values({
        id: event.args.roundId,
        state: "ACTIVE",
      })
      .onConflictDoNothing();
  } else {
    // update round state
    await context.db.update(rounds, { id: event.args.roundId }).set({
      state: [
        "ACTIVE",
        "SHUFFLING",
        "DEFENDERS",
        "RECONS",
        "SABOTEURS",
        "INFILTRATORS",
        "RESOLVED",
      ][event.args.newState] as
        | "ACTIVE"
        | "SHUFFLING"
        | "DEFENDERS"
        | "RECONS"
        | "SABOTEURS"
        | "INFILTRATORS"
        | "RESOLVED",
    });
  }

  // if state is shuffling, get aggregate totals from game state
  if (event.args.newState == 1) {
    const state = await context.db.find(gameState, { id: 1 });
    if (!state) return;

    await context.db.update(rounds, { id: event.args.roundId }).set({
      totalDefend: state.currentNumDefenders,
      totalRecon: state.currentNumRecons,
      totalSabotage: state.currentNumSaboteurs,
      totalInfiltrate: state.currentNumInfiltrators,
      totalSpyCount:
        (state.currentNumDefenders ?? 0) +
        (state.currentNumRecons ?? 0) +
        (state.currentNumSaboteurs ?? 0) +
        (state.currentNumInfiltrators ?? 0),
    });
  }
});

// event DefenderReward(uint256 indexed rewardId, uint256 indexed spyId, uint256 indexed roundId, uint256 amount);
ponder.on("SpyGameABI:DefenderReward", async ({ event, context }) => {
  // create a reward
  await context.db.insert(rewards).values({
    id: event.args.rewardId,
    spyId: event.args.spyId,
    roundId: event.args.roundId,
    amount: event.args.amount,
    vestingStart: new Date(Number(event.args.vestingStart)),
    action: "DEFEND",
  });

  const spy = await context.db.find(spies, { id: event.args.spyId });

  // snapshot spies
  if (spy && spy.id !== undefined) {
    await context.db.insert(spySnapshots).values({
      ...spy,
      id: spy.id,
      currentRound: event.args.roundId,
    });
  }

  // increment totalSpyAvailable for spy
  await context.db.update(spies, { id: event.args.spyId }).set((row) => ({
    totalSpyAvailable:
      (row.totalSpyAvailable ?? 0n) + BigInt(event.args.amount),
  }));

  // create a battle
  await context.db.insert(battles).values({
    roundId: event.args.roundId,
    spyId: event.args.spyId,
    action: "DEFEND",
    spyGain: event.args.amount,
  });

  if (!spy || spy.id === undefined) return;

  const seasonId = Math.floor(Number(event.args.roundId) / 15);
  // give leaderboard points to agency
  await context.db
    .insert(agencyPoints)
    .values({
      seasonId: BigInt(seasonId),
      agencyAddress: spy.agencyAddress,
      points: 1,
    })
    .onConflictDoUpdate((row) => ({
      points: (row.points ?? 0) + 1,
    }));

  // give leaderboard points to spy
  await context.db
    .insert(spyPoints)
    .values({
      seasonId: BigInt(seasonId),
      spyId: spy.id,
      points: 1,
    })
    .onConflictDoUpdate((row) => ({
      points: (row.points ?? 0) + 1,
    }));
});

ponder.on("SpyGameABI:SabotageReward", async ({ event, context }) => {
  // create a reward
  await context.db.insert(rewards).values({
    id: event.args.rewardId,
    spyId: event.args.spyId,
    roundId: event.args.roundId,
    amount: event.args.amount,
    vestingStart: new Date(Number(event.args.vestingStart)),
    action: "SABOTAGE",
  });

  const spy = await context.db.find(spies, { id: event.args.spyId });

  // increment totalSpyAvailable for spy
  await context.db.update(spies, { id: event.args.spyId }).set((row) => ({
    totalSpyAvailable:
      (row.totalSpyAvailable ?? 0n) + BigInt(event.args.amount),
  }));
});

ponder.on("SpyGameABI:BattleLog", async ({ event, context }) => {
  const action = ["DEFEND", "RECON", "SABOTAGE", "INFILTRATE"][
    Number(event.args.action)
  ] as "DEFEND" | "RECON" | "SABOTAGE" | "INFILTRATE";

  // create spy snapshot
  const spy = await context.db.find(spies, { id: event.args.spyA });
  if (spy && spy.id !== undefined) {
    await context.db.insert(spySnapshots).values({
      ...spy,
      currentRound: event.args.roundId,
    });
  }

  // create opponent snapshot
  const opponent = await context.db.find(spies, { id: event.args.spyB });
  if (opponent && opponent.id !== undefined) {
    await context.db.insert(spySnapshots).values({
      ...opponent,
      currentRound: event.args.roundId,
    });
  }

  // create a battle
  await context.db.insert(battles).values({
    roundId: event.args.roundId,
    spyId: event.args.spyA,
    opponentId: event.args.spyB === 0n ? null : event.args.spyB,
    action,
    result: Number(event.args.resultBits & 0x03),
    kill: Boolean(event.args.resultBits & 0x04),
    conversion: Boolean(event.args.resultBits & 0x08),
    spyGain: event.args.rewardA,
    opponentGain: event.args.rewardB,
  });

  // paired battle? → mirror row for spyB
  if (event.args.spyB !== 0n) {
    await context.db.insert(battles).values({
      roundId: event.args.roundId,
      spyId: event.args.spyB,
      opponentId: event.args.spyA,
      action,
      result: Number(
        (event.args.resultBits & 0x03) == 1
          ? 2
          : (event.args.resultBits & 0x03) == 2
          ? 1
          : 0
      ),
      kill: Boolean(event.args.resultBits & 0x04),
      conversion: Boolean(event.args.resultBits & 0x08),
      spyGain: event.args.rewardB,
      opponentGain: event.args.rewardA,
    });
  }

  if (!spy || spy.id === undefined) return;
  const seasonId = Math.floor(Number(event.args.roundId) / 15);
  let points = 0;
  if (action === "SABOTAGE") {
    points = 10;
    if (event.args.resultBits & 0x04 || event.args.resultBits & 0x08) {
      points += 5;
    }
  } else if (action === "INFILTRATE") {
    points = 15;
  }
  if (event.args.resultBits & 0x04) {
    points += 10;
  } else if (event.args.resultBits & 0x08) {
    points += 7;
  }

  // give leaderboard points to agency
  await context.db
    .insert(agencyPoints)
    .values({
      seasonId: BigInt(seasonId),
      agencyAddress: spy.agencyAddress,
      points: points,
    })
    .onConflictDoUpdate((row) => ({
      points: (row.points ?? 0) + points,
    }));

  // give leaderboard points to spy
  await context.db
    .insert(spyPoints)
    .values({
      seasonId: BigInt(seasonId),
      spyId: spy.id,
      points: points,
    })
    .onConflictDoUpdate((row) => ({
      points: (row.points ?? 0) + points,
    }));
});

const fieldMap = {
  DEFEND: "currentNumDefenders",
  RECON: "currentNumRecons",
  SABOTAGE: "currentNumSaboteurs",
  INFILTRATE: "currentNumInfiltrators",
} as const;

ponder.on("SpyGameABI:SpyKilled", async ({ event, context }) => {
  // update spy and set alive to false
  await context.db.update(spies, { id: event.args.spyId }).set({
    alive: false,
  });
  // add kill to spy
  await context.db
    .update(spies, {
      id: event.args.killedById,
    })
    .set((row) => ({
      numKills: (row.numKills ?? 0) + 1,
    }));

  const spy = await context.db.find(spies, { id: event.args.spyId });

  if (spy?.agencyAddress) {
    // add kill to agency
    await context.db
      .update(agencies, {
        address: spy?.agencyAddress,
      })
      .set((row) => ({
        numKills: (row.numKills ?? 0) + 1,
      }));
  }

  // add kill to stats
  await context.db.update(stats, { id: 1 }).set((row) => ({
    totalKills: (row.totalKills ?? 0) + 1,
  }));

  // add kill to round
  await context.db.update(rounds, { id: event.args.roundId }).set((row) => ({
    numSpiesKilled: (row.numSpiesKilled ?? 0) + 1,
  }));

  // decrement game state for spies staked
  const action = spy?.currentAction;
  const field = fieldMap[action as keyof typeof fieldMap];
  await context.db.update(gameState, { id: 1 }).set((row) => ({
    [field]: (row[field] ?? 1) - 1,
  }));
});

ponder.on("SpyGameABI:SpyConverted", async ({ event, context }) => {
  // switch owner of spy
  await context.db.update(spies, { id: event.args.spyId }).set({
    agencyAddress: event.args.newOwner,
  });

  // add convert to spy
  await context.db
    .update(spies, {
      id: event.args.convertedById,
    })
    .set((row) => ({
      numConverts: (row.numConverts ?? 0) + 1,
    }));

  const spy = await context.db.find(spies, { id: event.args.spyId });

  if (spy?.agencyAddress) {
    // add convert to agency
    await context.db
      .update(agencies, {
        address: spy?.agencyAddress,
      })
      .set((row) => ({
        numConverts: (row.numConverts ?? 0) + 1,
      }));
  }
  // add convert to stats
  await context.db.update(stats, { id: 1 }).set((row) => ({
    totalConverts: (row.totalConverts ?? 0) + 1,
  }));

  // add convert to round
  await context.db.update(rounds, { id: event.args.roundId }).set((row) => ({
    numSpiesConverted: (row.numSpiesConverted ?? 0) + 1,
  }));
});

ponder.on("SpyGameABI:InfiltrateReward", async ({ event, context }) => {
  // create a reward
  await context.db.insert(rewards).values({
    id: event.args.rewardId,
    spyId: event.args.spyId,
    roundId: event.args.roundId,
    amount: event.args.amount,
    vestingStart: new Date(Number(event.args.vestingStart)),
    action: "INFILTRATE",
  });

  const spy = await context.db.find(spies, { id: event.args.spyId });

  // increment totalSpyAvailable for spy
  await context.db.update(spies, { id: event.args.spyId }).set((row) => ({
    totalSpyAvailable:
      (row.totalSpyAvailable ?? 0n) + BigInt(event.args.amount),
  }));
});

ponder.on("SpyGameABI:XPGained", async ({ event, context }) => {
  // update spy and add xp
  await context.db.update(spies, { id: event.args.spyId }).set((row) => ({
    xp: (row.xp ?? 0n) + BigInt(event.args.xpGained),
  }));
});

ponder.on("SpyGameABI:SpyUpgraded", async ({ event, context }) => {
  // update spy and set rank
  await context.db.update(spies, { id: event.args.spyId }).set({
    rank: event.args.newRank,
    lastUpgradedTurn: event.args.roundId,
    versatile: event.args.newRank >= 4,
    stealth: event.args.newRank == 7,
  });
});

ponder.on("SpyGameABI:RewardClaimed", async ({ event, context }) => {
  // update reward and set claimed amount
  await context.db.update(rewards, { id: event.args.rewardId }).set((row) => ({
    claimedAmount: (row.claimedAmount ?? 0n) + BigInt(event.args.amount),
    fullyClaimed:
      (row.claimedAmount ?? 0n) + BigInt(event.args.amount) >=
      (row.amount ?? 0n),
  }));

  const reward = await context.db.find(rewards, {
    id: event.args.rewardId,
  });

  if (!reward || !reward.spyId) return;

  const spy = await context.db.find(spies, {
    id: reward.spyId,
  });

  if (!spy) return;

  // create a reward claim
  await context.db.insert(rewardClaims).values({
    txHash: event.transaction.hash,
    rewardId: event.args.rewardId,
    agencyId: spy.agencyAddress,
    spyId: spy.id,
    amount: event.args.amount,
    timestamp: new Date(Number(event.block.timestamp)),
  });

  if (!spy.agencyAddress) return;

  // add claimed amount to agency
  await context.db
    .update(agencies, {
      address: spy.agencyAddress,
    })
    .set((row) => ({
      totalSpyClaimed: (row.totalSpyClaimed ?? 0n) + BigInt(event.args.amount),
    }));

  // remove total spy available from spy
  await context.db.update(spies, { id: reward.spyId }).set((row) => ({
    totalSpyAvailable:
      (row.totalSpyAvailable ?? 0n) - BigInt(event.args.amount),
  }));

  // add to stats
  await context.db.update(stats, { id: 1 }).set((row) => ({
    totalSpyClaimed: (row.totalSpyClaimed ?? 0n) + BigInt(event.args.amount),
  }));
});

ponder.on("SpyGameABI:SpyRevived", async ({ event, context }) => {
  // update spy and set alive to true
  await context.db.update(spies, { id: event.args.spyId }).set({
    alive: true,
  });

  const spy = await context.db.find(spies, { id: event.args.spyId });

  if (spy?.agencyAddress) {
    // add revive to agency
    await context.db
      .update(agencies, {
        address: spy?.agencyAddress,
      })
      .set((row) => ({
        numRevives: (row.numRevives ?? 0) + 1,
      }));
  }

  // add revive to stats
  await context.db.update(stats, { id: 1 }).set((row) => ({
    totalRevives: (row.totalRevives ?? 0) + 1,
  }));
});

ponder.on("SpyGameABI:SpySchematicAttached", async ({ event, context }) => {
  // update spy and set schematic
  await context.db.update(spies, { id: event.args.spyId }).set({
    equippedSchematic: Number(event.args.schematicId),
    schematicExpiresTurn: event.args.expiresAt,
  });
});

ponder.on("SpyGameABI:AgencySchematicAttached", async ({ event, context }) => {
  await context.db.update(agencies, { address: event.args.agency }).set({
    equippedSchematic: Number(event.args.schematicId),
    schematicExpiresTurn: event.args.expiresAt,
  });
});

ponder.on("SpyIntelABI:MintIntel", async ({ event, context }) => {
  // create spy snapshot
  const spy = await context.db.find(spies, { id: event.args.spyId });
  if (spy && spy.id !== undefined) {
    await context.db
      .insert(spySnapshots)
      .values({
        ...spy,
        currentRound: event.args.currentTurn,
      })
      .onConflictDoNothing();
  }

  // Check if a battle already exists for this spy in this round
  const existingBattle = await context.db.find(battles, {
    spyId: event.args.spyId,
    roundId: event.args.currentTurn,
  });

  // battle intel
  await context.db
    .insert(battles)
    .values({
      roundId: event.args.currentTurn,
      spyId: event.args.spyId,
      action: "RECON",
      intelFound: [Number(event.args.intelId)],
    })
    .onConflictDoUpdate((battle) => ({
      intelFound: (battle.intelFound ?? []).concat([
        Number(event.args.intelId),
      ]),
    }));

  // get spy
  if (spy?.agencyAddress) {
    await context.db
      .update(agencies, { address: spy.agencyAddress })
      .set((row) => ({
        totalIntelFound: (row.totalIntelFound ?? 0) + 1,
      }));
  }

  // increment round intel found
  await context.db
    .update(rounds, { id: event.args.currentTurn })
    .set((row) => ({
      numIntelFound: (row.numIntelFound ?? 0) + 1,
    }));

  // increment stats intel found
  await context.db.update(stats, { id: 1 }).set((row) => ({
    totalIntelFound: (row.totalIntelFound ?? 0) + 1,
  }));

  if (!spy || spy.id === undefined) return;
  if (existingBattle) return;
  const seasonId = Math.floor(Number(event.args.currentTurn) / 15);
  // give leaderboard points to agency
  await context.db
    .insert(agencyPoints)
    .values({
      seasonId: BigInt(seasonId),
      agencyAddress: spy.agencyAddress,
      points: 3,
    })
    .onConflictDoUpdate((row) => ({
      points: (row.points ?? 0) + 3,
    }));

  // give leaderboard points to spy
  await context.db
    .insert(spyPoints)
    .values({
      seasonId: BigInt(seasonId),
      spyId: spy.id,
      points: 3,
    })
    .onConflictDoUpdate((row) => ({
      points: (row.points ?? 0) + 3,
    }));
});

ponder.on("SpyIntelABI:CraftSchematic", async ({ event, context }) => {
  // increment agency schematics crafted
  await context.db.update(agencies, { address: event.args.to }).set((row) => ({
    totalSchematicsCrafted: (row.totalSchematicsCrafted ?? 0) + 1,
  }));

  // increment stats schematics crafted
  await context.db.update(stats, { id: 1 }).set((row) => ({
    totalSchematicsCrafted: (row.totalSchematicsCrafted ?? 0) + 1,
  }));
});
