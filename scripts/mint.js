require("dotenv").config();

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(GOERLI_RPC_URL);

const contract = require("../artifacts/contracts/nft.sol/Pioneers.json");
//console.log(JSON.stringify(contract.abi));
const contractAddress = "0xcbf38260F58273437A084658a8225d99E2fb14b2";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };
  const signPromlise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signed.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\ncheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
  mintNFT(
    "https://gateway.pinata.cloud/ipfs/QmdLAn1wyRdWR6JPwdeqKikWDyFXVPyCT9SYuQRD8mmgtF?_gl=1*eko9vh*_ga*MTcwODE5MDM0My4xNjc2Mjc3OTY3*_ga_5RMPXG14TE*MTY3NjI5MTM0MC4zLjEuMTY3NjI5MTM1Ni40NC4wLjA."
  );
}
