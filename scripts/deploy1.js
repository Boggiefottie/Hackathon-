async function main() {
  const Pioneers = await ethers.getContractFactory("Pioneers");

  // Start deployment, returning a promise that resolves to a contract object
  const myNFT = await Pioneers.deploy(
    "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
  );
  console.log("Contract deployed to address:", myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
