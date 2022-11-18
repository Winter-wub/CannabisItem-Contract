import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const address = process.env.CannabisItemAddress ?? "";
  const canTokenAddress = process.env.CannabisTokenAddress ?? "";
  const instance = await CannabisItem.attach(address);
  await (await instance.setCanTokenAddress(canTokenAddress)).wait();
  console.log("Current CanAddress is", await instance.getCanTokenAddress());
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
