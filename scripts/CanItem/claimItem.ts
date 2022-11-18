import { ethers } from "hardhat";
async function main() {
  const CannabisItem = await ethers.getContractFactory("CannabisItem");
  const CannabisToken = await ethers.getContractFactory("CannabisToken");
  const canItemAddress = process.env.CannabisItemAddress ?? "";
  const canTokenAddress = process.env.CannabisTokenAddress ?? "";
  const wallet = new ethers.Wallet(
    "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
    ethers.provider
  );

  const canItemInstance = await CannabisItem.attach(canItemAddress);
  const canTokenInstance = await CannabisToken.attach(canTokenAddress);
  const playerItem = await canItemInstance.connect(wallet);
  const playerToken = await canTokenInstance.connect(wallet);
  const price = await canItemInstance.getClaimPrice();
  const userBalance = await canTokenInstance.balanceOf(wallet.address);

  console.log("Claim Rate: ", ethers.utils.formatEther(price), " CAN");
  console.log("User balance", ethers.utils.formatEther(userBalance), " CAN");

  if (price.lte(userBalance)) {
    const approvetx = await playerToken.approve(
      canItemAddress,
      ethers.utils.parseEther("0.0001")
    );
    await approvetx.wait();
    const tx = await playerItem.claimNFT();
    // Check Result From ClaimNFT
    const result = await tx.wait();
    result.events?.forEach((event) => {
      console.log(event.event, event.args);
    });
  } else {
    console.log("Not enough CAN");
  }
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
