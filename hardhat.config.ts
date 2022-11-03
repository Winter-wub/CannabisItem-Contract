import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks/upgrade";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    "bsc-testnet": {
      accounts: [process.env.pk ?? ""],
      url: "https://data-seed-prebsc-1-s1.binance.org:8545	",
    },
  },
};

export default config;
