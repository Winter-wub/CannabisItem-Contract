// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract RandomByRate {
   function getRandomNumbers(string memory seed) private view returns (uint256[4] memory) {
        (uint a, uint b, uint c, uint d) = (2,5,10,20); // rate item given max 100
    uint256 randomKeccak = uint256(keccak256(abi.encodePacked(seed, block.difficulty, block.timestamp, block.number)));
        return [
            randomKeccak % a,
            randomKeccak / a % b,
            randomKeccak / a / b % c,
            randomKeccak / a / b / c % d
        ];
    }

    function random() public view returns (uint256) {
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