# Avoiding Common Attacks

The following measures were applied in [CasinoDiceToken.sol](https://github.com/wngasinur/blockchain-developer-bootcamp-final-project/blob/main/contracts/CasinoDiceToken.sol) contracts to avoid common security pitfalls:

- **Proper setting of visibility for functions**: Functions are specified as being external, public, internal or private to reduce the attack surface of a contract system. - [SWC-100](https://swcregistry.io/docs/SWC-100)
- **Using Specific Compiler Pragma:** Solidity 0.8.9 is used in CasinoDiceToken contract and not floating pragma. - [SWC-103](https://swcregistry.io/docs/SWC-103) 
- **Proper Use of Require, Assert and Revert:** Using `require` to check the CDT balance prior the bet in **CasinoDiceToken** contract.

  


