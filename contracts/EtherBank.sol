// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;


// Let's scan this!
contract EtherBank {

    mapping(address => uint256) public balances;

    function depositETH() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdrawETH() external {

        // Higher than balance
        uint256 balance = balances[msg.sender];

        // Send ETH 
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Withdraw failed");

        // Update Balance
        balances[msg.sender] = 0;
    }
}
