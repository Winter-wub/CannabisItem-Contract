import { ethers } from "hardhat";
async function main() {
  const CannabisToken = await ethers.getContractFactory("CannabisToken");
  const address = process.env.CannabisItemAddress ?? "";
  const instance = await CannabisToken.attach(address);
  const owner = await instance.owner();

  console.log("owner", owner);

  // mint id 1 premium
  await instance.mint(owner, 20000, ethers.constants.AddressZero);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
