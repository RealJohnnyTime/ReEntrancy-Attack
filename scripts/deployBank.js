const hre = require("hardhat");
const config = require("../config");

async function main() {
  
  const Bank = await hre.ethers.getContractFactory("contracts/EtherBank.sol:EtherBank");
  const bank = await Bank.deploy();

  await bank.deployed();

  console.log("EtherBank deployed to:", bank.address);
  config.set({"bankContractAddress": bank.address})
}


module.exports = main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});