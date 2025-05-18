import { onchainEnum, onchainTable, primaryKey, relations } from "ponder";

export const action = onchainEnum("action", [
  "DEFEND",
  "RECON",
  "SABOTAGE",
  "INFILTRATE",
]);

export const roundState = onchainEnum("roundState", [
  "ACTIVE",
  "SHUFFLING",
  "DEFENDERS",
  "RECONS",
  "SABOTEURS",
  "INFILTRATORS",
  "RESOLVED",
]);

export const grade = onchainEnum("grade", ["E", "D", "C", "B", "A"]);

export const agencies = onchainTable("agencies", (t) => ({
  address: t.hex().primaryKey(),
  numKills: t.integer().default(0),
  numConverts: t.integer().default(0),
  numRevives: t.integer().default(0),
  totalSpyClaimed: t.bigint().default(0n),
  totalIntelFound: t.integer().default(0),
  totalSchematicsCrafted: t.integer().default(0),

  equippedSchematic: t.integer(),
  schematicExpiresTurn: t.bigint(),
}));

export const agenciesRelations = relations(agencies, ({ many }) => ({
  spies: many(spies),
  claims: many(rewardClaims),
}));

export const spies = onchainTable("spies", (t) => ({
  id: t.bigint().primaryKey(),
  // mint details
  timestamp: t.timestamp(),
  block: t.bigint(),
  mintHash: t.hex(),
  price: t.bigint(),

  // Ownership/Lifecycle
  agencyAddress: t.hex(),
  alive: t.boolean(),
  staked: t.boolean(),
  currentAction: action("action"),

  // Progression
  rank: t.integer(),
  xp: t.bigint(),
  lastUpgradedTurn: t.bigint(),
  totalSpyAvailable: t.bigint().default(0n),

  // behavior counters
  consecutiveDefend: t.integer(),
  consecutiveSabotage: t.integer(),
  consecutiveInfiltrate: t.integer(),
  numKills: t.integer(),
  numConverts: t.integer(),

  // skills
  grade: grade("grade"),
  guard: t.boolean(),
  saboteur: t.boolean(),
  infiltrator: t.boolean(),
  espionage: t.boolean(),
  cunning: t.boolean(),
  persuasion: t.boolean(),
  assassin: t.boolean(),
  virtuoso: t.boolean(),
  merchant: t.boolean(),
  immortal: t.boolean(),
  efficient: t.boolean(),
  stealth: t.boolean(),
  versatile: t.boolean(),

  equippedSchematic: t.integer(),
  schematicExpiresTurn: t.bigint(),
}));

export const spiesRelations = relations(spies, ({ one, many }) => ({
  agency: one(agencies, {
    fields: [spies.agencyAddress],
    references: [agencies.address],
  }),
  battles: many(battles),
  rewards: many(rewards),
}));

export const spySnapshots = onchainTable(
  "spySnapshots",
  (t) => ({
    id: t.bigint(),
    currentRound: t.bigint(),
    // mint details
    timestamp: t.timestamp(),
    block: t.bigint(),
    mintHash: t.hex(),
    price: t.bigint(),

    // Ownership/Lifecycle
    agencyAddress: t.hex(),
    alive: t.boolean(),
    staked: t.boolean(),
    currentAction: action("action"),

    // Progression
    rank: t.integer(),
    xp: t.bigint(),
    lastUpgradedTurn: t.bigint(),
    availableRewards: t.bigint(),

    // behavior counters
    consecutiveDefend: t.integer(),
    consecutiveSabotage: t.integer(),
    consecutiveInfiltrate: t.integer(),
    numKills: t.integer(),
    numConverts: t.integer(),

    // skills
    grade: grade("grade"),
    guard: t.boolean(),
    saboteur: t.boolean(),
    infiltrator: t.boolean(),
    espionage: t.boolean(),
    cunning: t.boolean(),
    persuasion: t.boolean(),
    assassin: t.boolean(),
    virtuoso: t.boolean(),
    merchant: t.boolean(),
    immortal: t.boolean(),
    efficient: t.boolean(),
    stealth: t.boolean(),
    versatile: t.boolean(),

    equippedSchematic: t.integer(),
    schematicExpiresTurn: t.bigint(),
  }),
  (table) => ({
    pk: primaryKey({
      columns: [table.id, table.currentRound],
    }),
  })
);

export const rounds = onchainTable("rounds", (t) => ({
  id: t.bigint().primaryKey(),
  state: roundState("roundState"),
  randomness: t.bigint(),

  burnedAmount: t.bigint().default(0n),
  leaderboardAmount: t.bigint().default(0n),

  // Aggregates
  totalDefend: t.integer().default(0),
  totalRecon: t.integer().default(0),
  totalSabotage: t.integer().default(0),
  totalInfiltrate: t.integer().default(0),
  totalSpyCount: t.integer().default(0),

  // Other stats
  numSpiesKilled: t.integer().default(0),
  numSpiesConverted: t.integer().default(0),
  numIntelFound: t.integer().default(0),
}));

export const roundsRelations = relations(rounds, ({ many }) => ({
  battles: many(battles),
  rewards: many(rewards),
}));

export const battles = onchainTable(
  "battles",
  (t) => ({
    roundId: t.bigint(),
    spyId: t.bigint(),
    opponentId: t.bigint(),

    action: action("action"),
    result: t.integer(), // 0 = draw, 1 = win, 2 = loss
    conversion: t.boolean(),
    kill: t.boolean(),
    spyGain: t.bigint(),

    intelFound: t.integer().array(),
  }),
  (table) => ({
    pk: primaryKey({
      columns: [table.roundId, table.spyId],
    }),
  })
);

export const battlesRelations = relations(battles, ({ one }) => ({
  round: one(rounds, {
    fields: [battles.roundId],
    references: [rounds.id],
  }),
  spy: one(spies, {
    fields: [battles.spyId],
    references: [spies.id],
  }),
  opponent: one(spies, {
    fields: [battles.opponentId],
    references: [spies.id],
  }),
  spySnapshot: one(spySnapshots, {
    fields: [battles.spyId, battles.roundId],
    references: [spySnapshots.id, spySnapshots.currentRound],
  }),
  opponentSnapshot: one(spySnapshots, {
    fields: [battles.opponentId, battles.roundId],
    references: [spySnapshots.id, spySnapshots.currentRound],
  }),
}));

export const rewards = onchainTable("rewards", (t) => ({
  id: t.bigint().primaryKey(),

  spyId: t.bigint(),
  roundId: t.bigint(),

  amount: t.bigint(),
  claimedAmount: t.bigint(),
  fullyClaimed: t.boolean(),
  vestingStart: t.timestamp(),

  action: action("action"),
}));

export const rewardsRelations = relations(rewards, ({ one, many }) => ({
  spy: one(spies, {
    fields: [rewards.spyId],
    references: [spies.id],
  }),
  round: one(rounds, {
    fields: [rewards.roundId],
    references: [rounds.id],
  }),
  rewardClaims: many(rewardClaims),
}));

export const rewardClaims = onchainTable("rewardClaims", (t) => ({
  txHash: t.hex().primaryKey(),

  rewardId: t.bigint(),
  agencyId: t.hex(),
  spyId: t.bigint(),
  amount: t.bigint(),

  timestamp: t.timestamp(),
}));

export const rewardClaimsRelations = relations(rewardClaims, ({ one }) => ({
  reward: one(rewards, {
    fields: [rewardClaims.rewardId],
    references: [rewards.id],
  }),
  agency: one(agencies, {
    fields: [rewardClaims.agencyId],
    references: [agencies.address],
  }),
}));

export const stats = onchainTable("stats", (t) => ({
  id: t.integer().primaryKey().default(1),
  totalKills: t.integer().default(0),
  totalConverts: t.integer().default(0),
  totalIntelFound: t.integer().default(0),
  totalSchematicsCrafted: t.integer().default(0),
  totalRevives: t.integer().default(0),
  totalSpyClaimed: t.bigint().default(0n),
  totalBurned: t.bigint().default(0n),
  totalToLeaderboard: t.bigint().default(0n),
}));

export const gameState = onchainTable("gameState", (t) => ({
  id: t.integer().primaryKey().default(1),
  gameStartTime: t.timestamp(),
  currentRound: t.bigint().default(0n),
  roundState: roundState("roundState"),
  currentNumDefenders: t.integer().default(0),
  currentNumRecons: t.integer().default(0),
  currentNumSaboteurs: t.integer().default(0),
  currentNumInfiltrators: t.integer().default(0),
}));
