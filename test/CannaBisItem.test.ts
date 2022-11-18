import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { CannabisItem } from "../typechain-types/contracts/CannaBisItem";
import { CannabisToken } from "./../typechain-types/contracts/CannabisToken";

describe("CannaItem", async () => {
  let CannabisItem: CannabisItem;
  let CannabisToken: CannabisToken;
  let owner: SignerWithAddress;
  let player: SignerWithAddress;

  beforeEach(async () => {
    [owner, player] = await ethers.getSigners();
    const contractItem = await ethers.getContractFactory("CannabisItem");
    const instanceItem = await upgrades.deployProxy(contractItem);
    CannabisItem = (await instanceItem.deployed()) as CannabisItem;
    const contractToken = await ethers.getContractFactory("CannabisToken");
    const instanceToken = await upgrades.deployProxy(contractToken);
    CannabisToken = (await instanceToken.deployed()) as CannabisToken;
    await CannabisItem.setCanTokenAddress(CannabisToken.address);
    await CannabisToken.setAddressOfTheNFTContract(CannabisItem.address);
  });

  it("should set the base URI", async () => {
    const itemId = 1;
    const url = "https://google.com/";
    await CannabisItem.setBaseURI("https://google.com/");
    const uri = await CannabisItem.uri(1);
    expect(uri).to.equal(url + itemId.toString() + ".json");
  });

  it("should mint a token", async () => {
    const itemId = 1;
    const total = 1;
    await CannabisItem.mint(
      owner.address,
      itemId,
      total,
      ethers.constants.AddressZero
    );
    const balance = await CannabisItem.balanceOf(owner.address, itemId);
    expect(balance).to.equal(total);
  });

  it("should claim a token", async () => {
    const price = ethers.utils.parseEther("0.1");
    const total = 23000;

    await CannabisItem.mint(
      owner.address,
      1,
      total,
      ethers.constants.AddressZero
    );
    await CannabisItem.mint(
      owner.address,
      2,
      total,
      ethers.constants.AddressZero
    );
    await CannabisItem.mint(
      owner.address,
      3,
      total,
      ethers.constants.AddressZero
    );
    await CannabisItem.mint(
      owner.address,
      4,
      total,
      ethers.constants.AddressZero
    );

    // mint CAN to player
    await (await CannabisToken.mint(player.address, price)).wait();
    const contractTokenByPlayer = await CannabisToken.connect(player);

    // allow player to spend CAN
    const approveTx = await contractTokenByPlayer.approve(
      CannabisItem.address,
      price
    );
    await approveTx.wait();
    await CannabisItem.setClaimPrice(price);
    const contractByPlayer = await CannabisItem.connect(player);
    const data = await contractByPlayer.claimNFT({ value: price });
    await data.wait();
    const filter = contractByPlayer.filters.ClaimNFT(null, null);
    const events = await contractByPlayer.queryFilter(filter);
    const event = events[0];
    const tokenId = event.args?.tokenId;
    const balance = await CannabisItem.balanceOf(player.address, tokenId);
    expect(balance).to.equal(1);
  });

  it("should not cliam a token when isClaimable = false", async () => {
    const itemId = 1;
    const price = ethers.utils.parseEther("0.1");
    const total = 23000;
    await CannabisItem.mint(
      owner.address,
      itemId,
      total,
      ethers.constants.AddressZero
    );
    await CannabisItem.setClaimPrice(price);
    const contractByPlayer = await CannabisItem.connect(player);
    await CannabisItem.setClaimable(false);
    expect(
      contractByPlayer.claimNFT({
        value: price,
      })
    ).to.be.revertedWith("Claiming is not enabled");
  });
});
