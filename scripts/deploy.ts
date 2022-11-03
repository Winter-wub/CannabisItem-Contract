import { ethers, upgrades } from "hardhat";

// run only first time
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const instance = await upgrades.deployProxy(CannabisItem);
  await instance.deployed();
  instance;
  console.log(`deployed to ${instance.address}`);
  console.log(`hash ${instance.deployTransaction.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
