import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { CannaBisItem } from "./../typechain-types/contracts/CannaBisItem";

describe("CannaItem", async () => {
  let CannabisItem: CannaBisItem;
  let owner: SignerWithAddress;
  let player: SignerWithAddress;

  beforeEach(async () => {
    [owner, player] = await ethers.getSigners();
    const contract = await ethers.getContractFactory("CannaBisItem");
    const instance = await upgrades.deployProxy(contract);
    CannabisItem = (await instance.deployed()) as CannaBisItem;
  });

  it("should set the base URI", async () => {
    const itemId = 1;
    const url = "https://google.com/";
    await CannabisItem.setBaseURI("https://google.com/");
    const uri = await CannabisItem.uri(1);
    expect(uri).to.equal(url + itemId.toString());
  });

  it("should mint a token", async () => {
    const itemId = 1;
    const total = 1;
    await CannabisItem.mint(
      owner.address,
      itemId,
      total,
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
    const balance = await CannabisItem.balanceOf(owner.address, itemId);
    expect(balance).to.equal(total);
  });

  it("should claim a token", async () => {
    const itemId = 1;
    const price = ethers.utils.parseEther("0.1");
    const total = 23000;
    await CannabisItem.mint(
      owner.address,
      itemId,
      total,
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );
    await CannabisItem.setClaimPrice(price);
    const contractByPlayer = await CannabisItem.connect(player);
    await contractByPlayer.claimNFT(itemId, {
      value: price,
    });
    const balanceOfPlayer = await CannabisItem.balanceOf(
      player.address,
      itemId
    );
    expect(balanceOfPlayer).to.equal(1);
  });
});
