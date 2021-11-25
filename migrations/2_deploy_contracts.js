var CasinoDiceToken = artifacts.require("./CasinoDiceToken.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CasinoDiceToken, {value:1*(10**18)});
};
