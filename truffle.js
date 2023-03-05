const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const protocol = "http"
const ip = "localhost"
const port = 9650
Web3.providers.HttpProvider.prototype.sendAsync =
  Web3.providers.HttpProvider.prototype.send

const provider = new Web3.providers.HttpProvider("https://rpc.ankr.com/avalanche_fuji")
const privateKeys = [
  "0xc5ff68eee74d447b88d5d0dd1d438b37f30a4c0b1e41e9c485c6e2ea282d1489"
]

const mnemonic = "bright rocket artefact hospital tongue deputy people wool remain engine summer umbrella"
module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 5000000
    },
    testing: {
      host: 'localhost',
      port: 9555,
      network_id: '4447',
      gas: 6000000
    },
    "rinkeby-infura": {
      provider: () => new HDWalletProvider(privateKeys, "https://rinkeby.infura.io/v3/" + process.env.INFURA_ID),
      network_id: 4,
      gas: 5000000,
      gasPrice: 10e9
    },
    "fuji": {
      provider: () => new HDWalletProvider(privateKeys, provider),
      network_id: 43113,
    },
  },
  compilers: {
    solc: {
      version: "0.8.10"
    }
  }
}

