const hre = require("hardhat");

async function main() {
    await require("../deployBank");
    await require("../useBank");
    await require("./deployAttackContract");
    await require("./attack");
    // await new Promise(resolve => setTimeout(resolve, 5000));
    await require("../checkBank");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
