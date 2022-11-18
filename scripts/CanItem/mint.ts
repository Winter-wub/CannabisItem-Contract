import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const address = process.env.CannabisItemAddress ?? "";
  const instance = await CannabisItem.attach(address);
  const owner = await instance.owner();

  // mint id 1 premium
  await instance.mint(owner, 1, 23000, ethers.constants.AddressZero);
  console.log("minted id 1 premium 23000 to: ", owner);

  // mint id 2 super rare
  await instance.mint(owner, 2, 2500, ethers.constants.AddressZero);
  console.log("minted id 2 premium 2500 to: ", owner);

  // mint id 3 ultimate rare
  await instance.mint(owner, 3, 250, ethers.constants.AddressZero);
  console.log("minted id 3 premium 250 to: ", owner);

  // mint id 4 top rare
  await instance.mint(owner, 4, 30, ethers.constants.AddressZero);
  console.log("minted id 4 premium 30 to: ", owner);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
