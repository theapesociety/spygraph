import { createConfig } from "ponder";
import { http } from "viem";

import { SpyGameABI } from "./abis/SpyGameABI";
import { SpyNFTABI } from "./abis/SpyNFTABI";
import { SpyIntelABI } from "./abis/SpyIntelABI";

export default createConfig({
  networks: {
    mainnet: {
      chainId: 1,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    SpyGameABI: {
      network: "mainnet",
      abi: SpyGameABI,
      address: "0x0000000000000000000000000000000000000000",
      startBlock: 1234567,
    },
    SpyNFTABI: {
      network: "mainnet",
      abi: SpyNFTABI,
      address: "0x0000000000000000000000000000000000000000",
      startBlock: 1234567,
    },
    SpyIntelABI: {
      network: "mainnet",
      abi: SpyIntelABI,
      address: "0x0000000000000000000000000000000000000000",
      startBlock: 1234567,
    },
  },
});
