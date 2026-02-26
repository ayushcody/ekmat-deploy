import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Account balance:", ethers.formatEther(balance), "ETH");

    // 1. Deploy Verifier
    console.log("\n📦 Deploying Verifier...");
    const Verifier = await ethers.getContractFactory("Verifier");
    const verifier = await Verifier.deploy();
    await verifier.waitForDeployment();
    const verifierAddress = await verifier.getAddress();
    console.log("✅ Verifier deployed to:", verifierAddress);

    // 2. Deploy EkMatVoting
    console.log("\n📦 Deploying EkMatVoting...");
    const EkMatVoting = await ethers.getContractFactory("EkMatVoting");
    const ekMatVoting = await EkMatVoting.deploy(verifierAddress);
    await ekMatVoting.waitForDeployment();
    const ekMatVotingAddress = await ekMatVoting.getAddress();
    console.log("✅ EkMatVoting deployed to:", ekMatVotingAddress);

    // Save deployments to JSON
    const network = process.env.HARDHAT_NETWORK || "localhost";
    const deploymentsDir = path.join(__dirname, `../../deployments/${network}`);
    if (!fs.existsSync(deploymentsDir)) {
        fs.mkdirSync(deploymentsDir, { recursive: true });
    }

    const deploymentData = {
        Verifier: verifierAddress,
        EkMatVoting: ekMatVotingAddress,
        Timestamp: new Date().toISOString(),
        Deployer: deployer.address,
        Network: network,
    };

    fs.writeFileSync(
        path.join(deploymentsDir, "addresses.json"),
        JSON.stringify(deploymentData, null, 2)
    );
    console.log(`\n📁 Deployment addresses saved to deployments/${network}/addresses.json`);

    // Auto-update frontend constants.ts with new addresses
    const constantsPath = path.join(__dirname, "../../frontend/src/utils/constants.ts");
    if (fs.existsSync(constantsPath)) {
        let constantsContent = fs.readFileSync(constantsPath, "utf-8");

        // Update the fallback addresses in constants.ts
        constantsContent = constantsContent.replace(
            /("0x[a-fA-F0-9]+");\s*\/\/\s*Sepolia deployment.*EkMatVoting/,
            `"${ekMatVotingAddress}"; // Sepolia deployment ${new Date().toISOString().split('T')[0]} EkMatVoting`
        );
        constantsContent = constantsContent.replace(
            /("0x[a-fA-F0-9]+");\s*\/\/\s*Sepolia deployment.*Verifier/,
            `"${verifierAddress}"; // Sepolia deployment ${new Date().toISOString().split('T')[0]} Verifier`
        );

        fs.writeFileSync(constantsPath, constantsContent);
        console.log("✅ Frontend constants.ts updated with new addresses");
    }

    // Print summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 DEPLOYMENT COMPLETE");
    console.log("=".repeat(60));
    console.log(`  Network:      ${network}`);
    console.log(`  Verifier:     ${verifierAddress}`);
    console.log(`  EkMatVoting:  ${ekMatVotingAddress}`);
    console.log(`  Deployer:     ${deployer.address}`);
    if (network === "sepolia") {
        console.log(`\n🔗 View on Etherscan:`);
        console.log(`  Verifier:    https://sepolia.etherscan.io/address/${verifierAddress}`);
        console.log(`  EkMatVoting: https://sepolia.etherscan.io/address/${ekMatVotingAddress}`);
    }
    console.log("=".repeat(60));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
