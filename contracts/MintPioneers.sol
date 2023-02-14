// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
// import "https://github.com/smartcontracts/chainlink/blob/develop/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract MintPioneers is ERC20 , ERC20Permit{

    AggregatorV3Interface internal priceFeed;
    event mintPioneers_TokenMinted(uint256 intialSupply);
    mapping(address=>uint256) public OwnerToToken;
    error MintPioneers_NoTokensOwned();
    uint256 eqvi_eth = 0;


        constructor() ERC20("Pioneers", "PIO") ERC20Permit("Pioneers")
        {
        priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
        
    }


    function mintTokens(uint256 initialSupply) payable public
    {
        OwnerToToken[msg.sender] = OwnerToToken[msg.sender] + initialSupply;
        _mint(msg.sender, initialSupply);
         emit mintPioneers_TokenMinted(initialSupply);
    }
    
        //0.5 eth = 1 PIO 

        function getEqviEth() public view returns(uint256)
        {
            if(OwnerToToken[msg.sender] == 0)
            {
               revert MintPioneers_NoTokensOwned(); 
            }
            else
            {
                return OwnerToToken[msg.sender]*1/2;
            }
        } 

        // pioneers to usd
        function latestRoundData() external view returns(uint256)
        {
                (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();
 
    uint256 usd = OwnerToToken[msg.sender]*uint256(answer)*1/2;
        return (usd);
        }
  
    
    
    
}


