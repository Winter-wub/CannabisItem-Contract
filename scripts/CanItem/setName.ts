import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const address = process.env.CannabisItemAddress ?? "";
  const instance = await CannabisItem.attach(address);
  await instance.setName("CanItem");
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
