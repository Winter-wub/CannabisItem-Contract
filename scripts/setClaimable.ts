import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const address = process.env.cannabisItemAddress ?? "";
  const instance = await CannabisItem.attach(address);
  await instance.setClaimable(true);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
