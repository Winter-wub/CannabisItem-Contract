import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig } from "hardhat/config";
import "./tasks/upgrade";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      accounts: [
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      ],
      url: "http://localhost:8545",
    },
    "bsc-testnet": {
      accounts: [
        // "b00dd55beecdef1adcb3c632710abd870fb882e4d50db9d9b3b81673164da94d", account1
        "0c94925831b6be3c2e45cf0980005ba14c233b904f232fa833e74649ed3acf8b", // metamark1
      ],
      url: "https://data-seed-prebsc-1-s1.binance.org:8545	",
    },
  },
};

export default config;
