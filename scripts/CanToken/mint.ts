import { ethers } from "hardhat";
async function main() {
  const CannabisToken = await ethers.getContractFactory("CannabisToken");
  const address = process.env.CannabisTokenAddress ?? "";
  const instance = await CannabisToken.attach(address);
  await instance.mint(
    "0x897746c40019d0B39601D894391CA0D8b7b3746B",
    2000000000000000
  );
  console.log(
    await instance.balanceOf("0x897746c40019d0B39601D894391CA0D8b7b3746B")
  );
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
