# Casino Dice Game
#### Website
[https://blockchain-developer-bootcamp-final-project-zeta.vercel.app/](https://blockchain-developer-bootcamp-final-project-zeta.vercel.app/) - Pointing to `Kovan Net` 

#### CDT Token Address / Smart Contract Address (Kovan)
`0x70e3057e2Fd2ae83B04c622E40937acd0f531088`

[https://kovan.etherscan.io/address/0x70e3057e2Fd2ae83B04c622E40937acd0f531088](https://kovan.etherscan.io/address/0x70e3057e2Fd2ae83B04c622E40937acd0f531088)

#### Owner Test Account (Private Keys)
Smart Contract Owner - `0c53a7b69c0b6d806067d781ffd5ac1bac16380ffbe68aee6546a6588e1dc460`

#### Screencast

TODO

#### Project description

Online Casino, the idea is any players can play the dice games and bet their Casino Dice Token (CDT).
The CDT is ERC20 standard.

There are 2 type of games available : 
   1. First game, guess low / high of the dice - `[Low/High]` with risk/reward 1:1
   2. Second game, guess the number of the dice -  `[1-6]` with risk/reward 1:6

Different game will have different risk/reward as mentioned above.
Since making transaction in blockchain is not free, there will be additional cost for every bet placed by player. The current bet fee is 0.5 CDT.

#### Use Cases

1. As a player, I can topup CDT tokens by exchanging ETH to CDT tokens
2. As a player, I can withdraw all my CDT tokens back to ETH
3. As a player, I can play dice games and place bet my CDT tokens
4. As a player, I can see all transactions
5. As a owner, I can update bet fee


#### Local Setup
The current smart contract file in git is pointing to `Kovan Test Net`. If you only need to run the frontend, you can skip the Smart Contract build and deploy steps.
##### Requirements 
   1. Node `v14/16`
   2. Truffle `v5` / Solc `0.8.9`
   3. Ganache with port `7545`
   4. Chrome with Metamask Plugin
      1. For first time setup, you need to import CDT token using Casino Dice Smart Contract Address
   
##### Steps to run smart contract and frontend locally
1. Smart Contract : Compile contract
   `truffle compile`
2. Smart Contract : Deploy contract to local Ganache
   `truffle migrate --reset`
3. Front End : Install node_module dependencies
   1. `cd client && set SKIP_PREFLIGHT_CHECK=true`
   2. `yarn install` or `npm install`
4. Front End : Start frontend
    `yarn start` or `npm start`


#### Running local unit tests
1. Install node_module dependencies
`yarn install` or `npm install`
2. Run truffle test 
`truffle test`


#### Deploy To Kovan Test Net

1. Set following .env files :
```
SMART_CONTRACT_PRIVATE_KEY=
INFURA_API_KEY=
```
2. `trufle migrate --network kovan`


#### Logs
##### Solidity Test Logs
```
λ truffle test
Using network 'test'.


Compiling your contracts...
===========================
√ Fetching solc version list from solc-bin. Attempt #1
> Compiling .\contracts\CasinoDiceToken.sol
> Compiling .\contracts\CasinoDiceToken.sol
> Compiling .\contracts\Migrations.sol
√ Fetching solc version list from solc-bin. Attempt #1
> Artifacts written to C:\Users\alucard\AppData\Local\Temp\test--1952-otoZApTRqFTf
> Compiled successfully using:
   - solc: 0.8.10+commit.fc410830.Emscripten.clang



  Contract: CasinoDiceToken
    √ The initial balance of the contract is 1000 CDT tokens (116ms)
    √ As a player, I can buy 100 CDT tokens with ETH (500ms)
    √ As a player, I can place my bet and win/lose my CDT tokens (1066ms)
    √ AS a player, I can see all transactions (127ms)
    √ AS a player, I can withdraw all my CDT tokens (641ms)
    √ As a player (not owner), I can't update bet fee (427ms)
    √ As a owner, I can update bet fee (398ms)


  7 passing (3s)
  ```
##### KOVAN Deployment Logs
```
Starting migrations...
======================
> Network name:    'kovan'
> Network id:      42
> Block gas limit: 12500000 (0xbebc20)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x7cd9532c7f68b60d916237871f1877a23d6340c84fc398b3e02f2e5028e1ccd4
   > Blocks: 2            Seconds: 5
   > contract address:    0x3930a9B83533f431EFdB9E873Ce57E0708cFAafF
   > block number:        28532311
   > block timestamp:     1637811244
   > account:             0xFE1F38F31e85A5deE5488f96Dd00282C4A98f867
   > balance:             1.246264923260367744
   > gas used:            203131 (0x3197b)
   > gas price:           10 gwei
   > value sent:          0 ETH
   > total cost:          0.00203131 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00203131 ETH


2_deploy_contracts.js
=====================

   Replacing 'CasinoDiceToken'
   ---------------------------
   > transaction hash:    0xa6f4d9b216b1deef73650f765d05431da15c02aea638ab863ea5ac3b6fbbd71b
   > Blocks: 1            Seconds: 9
   > contract address:    0x70e3057e2Fd2ae83B04c622E40937acd0f531088
   > block number:        28532314
   > block timestamp:     1637811264
   > account:             0xFE1F38F31e85A5deE5488f96Dd00282C4A98f867
   > balance:             0.214849453260367744
   > gas used:            3095631 (0x2f3c4f)
   > gas price:           10 gwei
   > value sent:          1 ETH
   > total cost:          1.03095631 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          1.03095631 ETH


Summary
=======
> Total deployments:   2
> Final cost:          1.03298762 ETH
```

#### TODO
1. Using Chainlink VRF to generate the randomness. Currently the randomness is generated through following vulnerable code
   ```
   uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)))
   ```