const hre = require("hardhat");
const config = require("../../config");

const etherBankAddress = config.configData.bankContractAddress;

async function main() {

    const signers = await hre.ethers.getSigners();
    const signer = signers[3];

    // Deploy malicious contract
    console.log("Deploying malicious contract from signer[3]...");
    const Attck = await hre.ethers.getContractFactory("contracts/solution/AttackBank.sol:AttackBank", signer);
    const attack = await Attck.deploy(etherBankAddress);
    await attack.deployed();
    console.log("Malicious contract has been deployed to:", attack.address);
    config.set({"attackContractAddress": attack.address})
}

module.exports = main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
