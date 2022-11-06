import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const address = "0x95DB6a1D5A743Bae227dD17B39CCdA9cFBb5Da7B";
  const instance = await CannabisItem.attach(address);
  // await instance.nam("CannabisItem");
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
