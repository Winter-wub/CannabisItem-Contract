import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannaBisItem");
  const address = process.env.proxyAddress ?? "";
  const instance = await CannabisItem.attach(address);

  // mint id 1 premium
  await instance.mint(
    "0xdd99976325a01699d238647D709fFC91B18d9643",
    1,
    23000,
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  instance.setBaseURI;
  // mint id 2 super rare
  await instance.mint(
    "0xdd99976325a01699d238647D709fFC91B18d9643",
    2,
    2500,
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  // mint id 3 ultimate rare
  await instance.mint(
    "0xdd99976325a01699d238647D709fFC91B18d9643",
    3,
    250,
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );

  // mint id 4 top rare
  await instance.mint(
    "0xdd99976325a01699d238647D709fFC91B18d9643",
    4,
    30,
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
