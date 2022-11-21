// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./CannabisToken.sol";
import "./RandomByRate.sol";

contract CannabisItem is
    Initializable,
    ERC1155Upgradeable,
    OwnableUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable
{
    uint256 private claimPrice;
    string private baseURI;
    bool private isClaimable;
    string private _name;
    uint256 private _startClaimTokenID;
    uint256 private _endClaimTokenID;
    address private _tokenAddress;

    event ClaimNFT(uint256 tokenId, address claimer);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC1155_init("http://localhost:3000/{id}");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        claimPrice = 5000000000000;
        _name = "CanItem";
        isClaimable = true;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function setName(string memory newName) public onlyOwner {
        _name = newName;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setBaseURI(string memory newuri) public onlyOwner {
        baseURI = newuri;
    }

    function uri(uint256 id) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, Strings.toString(id), ".json"));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
        whenNotPaused
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function setClaimPrice(uint256 price) public onlyOwner {
        require(price > 0, "Price must be greater than 0");
        claimPrice = price;
    }

    function random(uint num) private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % num;
    }

    function claimNFT() public payable {
        require(isClaimable == true, "Claiming is not enabled");
        // Check CAN Token

        // initalize ERC20 (CAN Token Contract)
        CannabisToken canToken = CannabisToken(_tokenAddress);
        require(
            canToken.balanceOf(msg.sender) >= claimPrice,
            "Not enough CAN Token"
        );
        uint tokenId = randomIdItem() + 1;
        while (balanceOf(owner(), tokenId) == 0) {
            tokenId = randomIdItem() + 1;
        }
        canToken.transferFrom(msg.sender, canToken.owner(), claimPrice);
        _safeTransferFrom(owner(), msg.sender, tokenId, 1, "");
        emit ClaimNFT(tokenId, msg.sender);
    }

    function setClaimable(bool claimable) public onlyOwner {
        isClaimable = claimable;
    }

    function setCanTokenAddress(address canTokenAddress) public onlyOwner {
        _tokenAddress = canTokenAddress;
    }

    function getCanTokenAddress() public view returns (address) {
        return _tokenAddress;
    }

    function getClaimPrice() public view returns (uint256) {
        return claimPrice;
    }

    function getRandomNumbers(string memory seed)
        private
        view
        returns (uint256[4] memory)
    {
        (uint a, uint b, uint c, uint d) = (2, 5, 10, 20); // rate item given max 100
        uint256 randomKeccak = uint256(
            keccak256(
                abi.encodePacked(
                    seed,
                    block.difficulty,
                    block.timestamp,
                    block.number
                )
            )
        );
        return [
            randomKeccak % a,
            (randomKeccak / a) % b,
            (randomKeccak / a / b) % c,
            (randomKeccak / a / b / c) % d
        ];
    }

    function randomIdItem() public view returns (uint256) {
        uint256[4] memory randomNumbers = getRandomNumbers("seed");
        uint256 max;
        uint256 maxIndex;

        for (uint256 i = 0; i < randomNumbers.length; i++) {
            if (randomNumbers[i] > max) {
                max = randomNumbers[i];
                maxIndex = i;
            }
        }

        return maxIndex;
    }
}
