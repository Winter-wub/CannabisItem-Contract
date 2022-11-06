import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const privateKey = process.env.pk ?? "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    "bsc-testnet": {
      accounts: [privateKey],
      url: "https://data-seed-prebsc-1-s1.binance.org:8545	",
    },
    localhost: {
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
      url: "http://localhost:8545",
    },
  },
};

export default config;
