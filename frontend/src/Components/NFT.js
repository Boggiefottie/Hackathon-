import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import Collection from "../nft.json";
function NFT() {
      const [currentAccount, setCurrentAccount] = useState("");
      const [contract, setContract] = useState(null);
      const [maxMintAmount, setMaxMintAmount] = useState(5);
      const [totalSupply, setTotalSupply] = useState(0);
      const [baseURI, setBaseURI] = useState("");
    
      useEffect(() => {
        requestAccount();
        getContract();
        getTotalSupply();
        getBaseURI();
      }, []);
    
      const requestAccount = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await ethers.provider.listAccounts();
        setCurrentAccount(accounts[0]);
      };
    
      const getContract = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const networkId = await provider.getNetwork().chainId;
        const deployedNetwork = Collection.networks[networkId];
        const contract = new ethers.Contract(
          deployedNetwork.address,
          Collection.abi,
          signer
        );
        setContract(contract);
      };
    
      const getTotalSupply = async () => {
        const supply = await contract.totalSupply();
        setTotalSupply(supply.toNumber());
      };
    
      const getBaseURI = async () => {
        const uri = await contract.baseURI();
        setBaseURI(uri);
      };
    
      const handleMint = async () => {
        if (currentAccount === "0x56C0f07c9a945379f2243850C4A60419486933d1") {
          alert("Please connect your wallet to mint NFTs.");
        } else {
          const amount = prompt(
            `Enter the number of NFTs you'd like to mint (max ${maxMintAmount}):`
          );
          if (amount && amount <= maxMintAmount) {
            const tx = await contract.mint(currentAccount, amount);
            await tx.wait();
            getTotalSupply();
          } else {
            alert(
              `Invalid amount. Please enter a value between 1 and ${maxMintAmount}.`
            );
          }
        }
      };
    
      return (
        <div className="App">
          <header className="App-header">
            <h1>Pioneers NFT Collection</h1>
            <h3>Total Supply: {totalSupply}</h3>
            <h3>Base URI: {baseURI}</h3>
            <h3>Max Mint Amount: {maxMintAmount}</h3>
            {currentAccount === "" ? (
              <button onClick={requestAccount}>Connect Wallet</button>
            ) : (
              <div>
                <p>Connected Account: {currentAccount}</p>
                <button onClick={handleMint}>Mint NFT</button>
              </div>
            )}
          </header>
        </div>
      );
}

export default NFT