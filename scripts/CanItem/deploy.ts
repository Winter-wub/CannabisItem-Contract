import { ethers, upgrades } from "hardhat";

// run only first time
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const canItem = await upgrades.deployProxy(CannabisItem);
  await canItem.deployed();
  console.log(`CanItem deployed to ${canItem.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
