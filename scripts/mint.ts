import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const address = process.env.cannabisItemAddress ?? "";
  const instance = await CannabisItem.attach(address);
  const owner = await instance.owner();

  console.log("owner", owner);

  // mint id 1 premium
  await instance.mint(owner, 1, 23000, ethers.constants.AddressZero);

  // mint id 2 super rare
  await instance.mint(owner, 2, 2500, ethers.constants.AddressZero);

  // mint id 3 ultimate rare
  await instance.mint(owner, 3, 250, ethers.constants.AddressZero);

  // mint id 4 top rare
  await instance.mint(owner, 4, 30, ethers.constants.AddressZero);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
