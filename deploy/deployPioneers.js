
const { network, ethers } = require("hardhat")
const { networkConfig } = require("../hardhat-helper.config")
module.exports =  async ({deployments, getNamedAccounts }) =>
{
        const {deployer} = await getNamedAccounts()
        const {deploy, log} = deployments
        const chainId = network.config.chainId

        const MintPioneers = await deploy("MintPioneers", 
        {
            from : deployer,
            log : true,
            args: [],

        })

        log("Contract deployed")
}