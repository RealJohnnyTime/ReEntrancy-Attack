const hre = require("hardhat");
const config = require("../config");

const contractAddress = config.configData.bankContractAddress;
const contractName = "contracts/EtherBank.sol:EtherBank";

async function main() {

    const signers = await hre.ethers.getSigners();

    // Deposit from Account 0
    console.log("Depositing 3 ETH from Account 0")
    let bankContract = await hre.ethers.getContractAt(contractName, contractAddress, signers[0]);
    await (await bankContract.depositETH({ value: hre.ethers.utils.parseUnits("3", "ether") })).wait();

    // Deposit from Account 1
    console.log("Depositing 5 ETH from Account 1")
    bankContract = await hre.ethers.getContractAt(contractName, contractAddress, signers[1]);
    await (await bankContract.depositETH({ value: hre.ethers.utils.parseUnits("5", "ether") })).wait();

    // Deposit from Account 2
    console.log("Depositing 12 ETH from Account 2")
    bankContract = await hre.ethers.getContractAt(contractName, contractAddress, signers[2]);
    await (await bankContract.depositETH({ value: hre.ethers.utils.parseUnits("12", "ether") })).wait();

    // Print Bank Data
    console.log(`Bank Balance: ${hre.ethers.utils.formatUnits(await hre.ethers.provider.getBalance(contractAddress))}`)
    console.log(`Account 0 Bank Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[0].address))}`)
    console.log(`Account 1 Bank Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[1].address))}`)
    console.log(`Account 2 Bank Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[2].address))}`)
    console.log(`Account 3 Bank Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[3].address))}`)

}

module.exports = main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});