export const SpyGameABI = [
  {
    inputs: [],
    name: "AlreadyUpgraded",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedTransfer",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientXP",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAuth",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidContractState",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInput",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSchematic",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxRankReached",
    type: "error",
  },
  {
    inputs: [],
    name: "NotStaked",
    type: "error",
  },
  {
    inputs: [],
    name: "RoundLocked",
    type: "error",
  },
  {
    inputs: [],
    name: "RoundNotComplete",
    type: "error",
  },
  {
    inputs: [],
    name: "SchematicSet",
    type: "error",
  },
  {
    inputs: [],
    name: "SpyAlreadyAlive",
    type: "error",
  },
  {
    inputs: [],
    name: "SpyNotAlive",
    type: "error",
  },
  {
    inputs: [],
    name: "VRFPending",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agency",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "schematicId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiresAt",
        type: "uint256",
      },
    ],
    name: "AgencySchematicAttached",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "spyA",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "spyB",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum SpyGame.Action",
        name: "action",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "resultBits",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rewardB",
        type: "uint256",
      },
    ],
    name: "BattleLog",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rewardId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vestingStart",
        type: "uint256",
      },
    ],
    name: "DefenderReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newGameStartTime",
        type: "uint256",
      },
    ],
    name: "GameStartTimeSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rewardId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vestingStart",
        type: "uint256",
      },
    ],
    name: "InfiltrateReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rewardId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum SpyGame.RoundState",
        name: "newState",
        type: "uint8",
      },
    ],
    name: "RoundStateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "rewardId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "vestingStart",
        type: "uint256",
      },
    ],
    name: "SabotageReward",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "oldOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "convertedById",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "SpyConverted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "killedById",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "SpyKilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "SpyRevived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "schematicId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "expiresAt",
        type: "uint256",
      },
    ],
    name: "SpySchematicAttached",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum SpyGame.Action",
        name: "action",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "skills",
        type: "uint16",
      },
    ],
    name: "SpyStaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "SpyUnstaked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "newRank",
        type: "uint8",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isMerchant",
        type: "bool",
      },
    ],
    name: "SpyUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "xpGained",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
    ],
    name: "XPGained",
    type: "event",
  },
  {
    inputs: [],
    name: "BATCH_SIZE",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TOTAL_ALLOCATED_REWARDS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "agencySchematics",
    outputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "expiresAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "schematicId",
        type: "uint8",
      },
    ],
    name: "attachSchematicToAgency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "schematicId",
        type: "uint8",
      },
    ],
    name: "attachSchematicToSpy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "rewardIds",
        type: "uint256[]",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentTurn",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameStartTime",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agency",
        type: "address",
      },
    ],
    name: "getAgencySchematic",
    outputs: [
      {
        internalType: "uint8",
        name: "schematicId",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
    ],
    name: "getSpyBaseInfo",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "rank",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "xp",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "staked",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "alive",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "equippedSchematicId",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "skills",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_spyNFT",
        type: "address",
      },
      {
        internalType: "address",
        name: "_spyToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_intel",
        type: "address",
      },
      {
        internalType: "address",
        name: "_schematic",
        type: "address",
      },
      {
        internalType: "address",
        name: "_leaderboard",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vrf",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "leaderboardAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
    ],
    name: "randomNumberCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requestIdToRound",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "resolveRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "reviveSpy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "xp",
        type: "uint256",
      },
    ],
    name: "rewardXPToAgency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rewards",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roundId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "spyId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "claimedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "vestingStart",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "roundRandomness",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "roundState",
    outputs: [
      {
        internalType: "enum SpyGame.RoundState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newGameStartTime",
        type: "uint256",
      },
    ],
    name: "setGameStartTime",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_leaderboardAddress",
        type: "address",
      },
    ],
    name: "setLeaderboardAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "spies",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "rank",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "xp",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "skills",
        type: "uint16",
      },
      {
        internalType: "uint8",
        name: "consecutiveDefend",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "consecutiveSabotage",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "consecutiveInfiltrate",
        type: "uint8",
      },
      {
        internalType: "enum SpyGame.Action",
        name: "currentAction",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "lastUpgraded",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "staked",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "alive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spyIntel",
    outputs: [
      {
        internalType: "contract SpyIntel",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spyNFT",
    outputs: [
      {
        internalType: "contract ISpyNFT",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spySchematic",
    outputs: [
      {
        internalType: "contract SpySchematic",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "spySchematics",
    outputs: [
      {
        internalType: "uint8",
        name: "id",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "expiresAt",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "spyToken",
    outputs: [
      {
        internalType: "contract SpyToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "enum SpyGame.Action[]",
        name: "actions",
        type: "uint8[]",
      },
    ],
    name: "stakeSpies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "enum SpyGame.Action[]",
        name: "newActions",
        type: "uint8[]",
      },
    ],
    name: "switchActions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "turnDuration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
    ],
    name: "unstakeSpies",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "upgradeSpy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vrfSystem",
    outputs: [
      {
        internalType: "contract IVRFSystem",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
