import { ethers, upgrades } from "hardhat";

async function main() {
  const proxyAddress = process.env.proxyAddress ?? "";
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const instance = await upgrades.upgradeProxy(proxyAddress, CannabisItem);
  console.log(`hash ${instance.deployTransaction.hash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
