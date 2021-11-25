# Design pattern decisions

The following design patterns were implemented in [CasinoDiceToken.sol](https://github.com/wngasinur/blockchain-developer-bootcamp-final-project/blob/main/contracts/CasinoDiceToken.sol) :
## Access Control Design Patterns 
-  The **CasinoDiceToken** contract is using `onlyOwner` modifier to protect the `updateBetFee` function execution. 

## Inheritance and Interfaces
-  The **CasinoDiceToken** contract inherites OpenZepplin ERC20 . 

## Oracle
-  TODO : Connect to chainlink VRF to generate randomness dice number. (due to time limit this is not implemented)
