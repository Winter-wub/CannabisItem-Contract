// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CannaBisItem is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable {
    
    uint256 private claimPrice;
    string private baseURI;
    bool private isClaimable;
    string private _name;

    event ClaimNFT(uint256 tokenId, address claimer);

    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC1155_init("http://localhost:3000/{id}");
        __Ownable_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        claimPrice = 5000000000000;
        _name = "CannaBisItem";
        isClaimable = true;
    }

    function name() view public returns (string memory) {
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
        return string(abi.encodePacked(baseURI, Strings.toString(id)));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function setClaimPrice(uint256 price) public onlyOwner {
        require(price > 0, "Price must be greater than 0");
        claimPrice = price;
    }

    function claimNFT(uint256 tokenId) public payable {
        require(isClaimable, "Claiming is not enabled");
        require(msg.value >= claimPrice, "Not enough ETH");
        _safeTransferFrom(owner(), msg.sender, tokenId, 1, "");
        (bool sent, bytes memory data) = owner().call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        emit ClaimNFT(tokenId, msg.sender);
    }

    function setClaimable(bool claimable) public onlyOwner {
        isClaimable = claimable;
    }
}