const hre = require("hardhat");
const config = require("../config");

const contractAddress = config.configData.bankContractAddress;
const contractName = "contracts/EtherBank.sol:EtherBank";

async function main() {

    const signers = await hre.ethers.getSigners();
    let bankContract = await hre.ethers.getContractAt(contractName, contractAddress, signers[0]);

    // Print Bank Data
    console.log(`Bank Balance: ${hre.ethers.utils.formatUnits(await hre.ethers.provider.getBalance(contractAddress))}`)
    console.log(`Account 0 Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[0].address))}`)
    console.log(`Account 1 Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[1].address))}`)
    console.log(`Account 2 Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[2].address))}`)
    console.log(`Account 3 Balance: ${hre.ethers.utils.formatUnits(await bankContract.balances(signers[3].address))}`)

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
