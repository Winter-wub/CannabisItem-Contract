import { ethers, upgrades } from "hardhat";

async function main() {
  const canItemAddress = process.env.CannabisTokenAddress ?? "";
  const CannabisItem = await ethers.getContractFactory("CannabisToken");
  const canItem = await upgrades.upgradeProxy(canItemAddress, CannabisItem);
  console.log("canItem upgraded", canItem);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
