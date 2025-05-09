import { createConfig } from "ponder";
import { http } from "viem";

import { SpyGameABI } from "./abis/SpyGameABI";
import { SpyNFTABI } from "./abis/SpyNFTABI";
import { SpyIntelABI } from "./abis/SpyIntelABI";
import { baseSepolia } from "viem/chains";

export default createConfig({
  networks: {
    baseSepolia: {
      chainId: 84532,
      transport: http(process.env.PONDER_RPC_URL_1),
    },
  },
  contracts: {
    SpyGameABI: {
      network: "baseSepolia",
      abi: SpyGameABI,
      address: "0x2beda07368356637ebc639983723ab2958f4b100",
      startBlock: 25390000,
    },
    SpyNFTABI: {
      network: "baseSepolia",
      abi: SpyNFTABI,
      address: "0x182c7db3e13513110be570a0c4fddfb752cc7d18",
      startBlock: 25390000,
    },
    SpyIntelABI: {
      network: "baseSepolia",
      abi: SpyIntelABI,
      address: "0xb2b3625327cc36acfeb8fe01c58277eafd6f7e1b",
      startBlock: 25390000,
    },
  },
});
