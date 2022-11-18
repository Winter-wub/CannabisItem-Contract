import { ethers, upgrades } from "hardhat";

// run only first time
async function main() {
  const CannabisToken = await ethers.getContractFactory("CannabisToken");
  const can = await upgrades.deployProxy(CannabisToken);
  await can.deployed();
  console.log(`CAN deployed to ${can.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
