import { ethers, upgrades } from "hardhat";

async function main() {
  const canItemAddress = process.env.CannabisItemAddress ?? "";
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const canItem = await upgrades.upgradeProxy(canItemAddress, CannabisItem);
  console.log("canItem upgraded", canItem);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
