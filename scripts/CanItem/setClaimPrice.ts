import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const address = process.env.CannabisItemAddress ?? "";
  const instance = await CannabisItem.attach(address);
  await instance.setClaimPrice(ethers.utils.parseEther("0.0001"));

  console.log("current claimPrice: ", await instance.getClaimPrice());
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
