import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-abi-exporter";

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
      url: "https://bsc-testnet.public.blastapi.io",
    },
    goerli: {
      accounts: [privateKey],
      url: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    },
    localhost: {
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
      url: "http://localhost:8545",
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
