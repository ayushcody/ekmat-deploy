import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

// Only include private key if it looks valid (64 hex chars)
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const isValidKey = /^[0-9a-fA-F]{64}$/.test(PRIVATE_KEY);
const accounts = isValidKey ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337, // Ganache default
    },
    // Sepolia testnet configuration
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts,
      chainId: 11155111,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
