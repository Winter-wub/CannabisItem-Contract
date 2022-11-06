import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const address = process.env.proxyAddress ?? "";
  const instance = await CannabisItem.attach(address);
  const owner = await instance.owner();
  console.log("owner", owner);
  const signerList = await ethers.getSigners();
  console.log(
    "signerList",
    signerList.map((s) => s.address)
  );
  await instance.setClaimable(true);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
