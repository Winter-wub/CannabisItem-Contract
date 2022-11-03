task("upgrade", "Upgrade the contract by policy contract")
  .addParam("policyAddress", "The address of the policy contract")
  .setAction(async (taskArgs, { ethers, upgrades }) => {
    const { policyAddress } = taskArgs;
    const CannabisItemV2 = await ethers.getContractFactory("CannaBisItem"); //new version
    const canabisContractV2 = await upgrades.upgradeProxy(
      policyAddress,
      CannabisItemV2
    );
    console.log(`hash ${canabisContractV2.deployTransaction.hash}`);
  });
