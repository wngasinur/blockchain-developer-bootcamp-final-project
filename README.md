# Casino Dice Token (CDT)


## Project description

The idea is casino players can play the dice games and bet their CDT Tokens.

1. Place their bet by putting decision either Low (1-3) or High (4-6)
2. Risk / Reward is 1 to 1 between host and player
3. Player can choose their bet amount in CDT Tokens
4. Player clicks "Roll". 
5. The smart contract will get random number from off chain oracle, to generate random the dice number
6. If the player is right, he/she will get the reward based on the amount of the bet
7. If the player is wrong, he/she will loss the amount of the bet


#### KOVAN Deployment Logs
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