const path = require("path");

const HDWalletProvider = require("@truffle/hdwallet-provider");

require('dotenv').config() 

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 7545
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.SMART_CONTRACT_PRIVATE_KEY, "https://kovan.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 42,
      gas: 12000000,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      version: "0.8.9"
    }
  }
};
