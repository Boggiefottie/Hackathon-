// SPDX-License-Identifier: MIT LICENSE

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

pragma solidity ^0.8.0;

contract Collection is ERC721Enumerable, Ownable {
    struct TokenInfo {
        // accepting multiple crypto currencies
        IERC20 paytoken; //allow smart contract to use different tokens
        uint256 costvalue; // store every unique value of each token
    }

    TokenInfo[] public AllowedCrypto; //everytime calling struct write and read so public

    using Strings for uint256;
    string public baseURI;
    string public baseExtension = ".json";
    uint256 public maxSupply = 1000;
    uint256 public maxMintAmount = 5;
    bool public paused = false;

    constructor() ERC721("Pioneers NFT Collection", "PIO") {}

    function addCurrency(
        //currency used to pay this
        IERC20 _paytoken, //ask everytime when contract deployer want to add diff token to sell nft
        uint256 _costvalue // will store cost of particular nft in particular token that we are going to allow to use
    ) public onlyOwner {
        //onlyOwner can call this
        AllowedCrypto.push( // everytime someone call this we will push and create a pool with index created
            TokenInfo({paytoken: _paytoken, costvalue: _costvalue})
        );
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://EE5MmqVp5MmqVp7ZRMBBizicVh9ficVh9fjUofWicVh9f/";
    }

    function mint(
        address _to,
        uint256 _mintAmount,
        uint256 _pid
    ) public payable {
        TokenInfo storage tokens = AllowedCrypto[_pid]; //storing every TokenInfo in tokens object done from particular pool id by AllowedCrypto[_pid] that user selects for different tokens on function addCurrency() being called smrt contract will use new pid everytime
        IERC20 paytoken; // here paytoken will store erc20 token contract address token that will accept payment using ierc
        paytoken = tokens.paytoken; //  paytoken(0 ,1, 2...) it will make sure it knows which crypto is being called paytoken.transferFrom
        uint256 cost; // cost for minting token
        cost = tokens.costvalue; // cost wrt pid
        uint256 supply = totalSupply();
        require(!paused);
        require(_mintAmount > 0);
        require(_mintAmount <= maxMintAmount);
        require(supply + _mintAmount <= maxSupply);

        if (msg.sender != owner()) {
            require(
                msg.value == cost * _mintAmount,
                "Not enough balance to complete transaction."
            );
        }

        for (uint256 i = 1; i <= _mintAmount; i++) {
            paytoken.transferFrom(msg.sender, address(this), cost); //token vaeriable call function inside ierc20 interface by using (.transferFrom) send from erc721 and inform the cost by (cost) to ierc20 interface
            _safeMint(_to, supply + i);
        }
    }

    function walletOfOwner(
        address _owner
    ) public view returns (uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    // only owner

    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setBaseExtension(
        string memory _newBaseExtension
    ) public onlyOwner {
        baseExtension = _newBaseExtension;
    }

    function pause(bool _state) public onlyOwner {
        paused = _state;
    }

    function withdraw(uint256 _pid) public payable onlyOwner {
        TokenInfo storage tokens = AllowedCrypto[_pid]; // transfer from this particular token
        IERC20 paytoken;
        paytoken = tokens.paytoken;
        paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
    }
}
