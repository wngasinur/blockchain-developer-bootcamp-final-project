const CasinoDiceToken = artifacts.require("./CasinoDiceToken.sol");

const toBN = web3.utils.toBN;
const exchangeRate = 1000;

contract("CasinoDiceToken", accounts => {
  
  it("The initial balance of the contract is 1000 CDT tokens", async () => {
    const casinoDiceTokenInstance = await CasinoDiceToken.deployed();

    const balance = await casinoDiceTokenInstance.balanceOf(accounts[0])

    const expectedCDTAmount = 1000
    const tokens = web3.utils.toWei(expectedCDTAmount.toString(), 'ether')

    assert.isTrue(balance.eq(toBN(tokens)), "Incorrect balance "+tokens);

  });

  it("As a player, I can buy 100 CDT tokens with ETH", async () => {
    const casinoDiceTokenInstance = await CasinoDiceToken.deployed();

    const buyCDTAmount = 100
    const ethAmount = buyCDTAmount / exchangeRate

    const weiAmount = web3.utils.toWei(ethAmount.toString(), 'ether')
    await casinoDiceTokenInstance.buy( { from: accounts[0], value:weiAmount })

    const balance = await casinoDiceTokenInstance.balanceOf(accounts[0])

    const expectedCDTAmount = 1100
    const tokens = web3.utils.toWei(expectedCDTAmount.toString(), 'ether')

    assert.isTrue(balance.eq(toBN(tokens)), "Incorrect balance "+tokens);

  });

  it("As a player, I can place my bet and win/lose my CDT tokens", async () => {
    const casinoDiceTokenInstance = await CasinoDiceToken.deployed();

    const cdtToken = 50
    const betToken = toBN(web3.utils.toWei(cdtToken.toString(), 'ether'))

    const betRequest1 = {
      betType: "lowHigh",
      betValue: 1,
      betToken: betToken.toString()
    }

    const betFee = toBN((await casinoDiceTokenInstance.getBetFee()).toString())

   
    const currentBalance = toBN(await casinoDiceTokenInstance.balanceOf(accounts[0]))

    const resp = await casinoDiceTokenInstance.roll(betRequest1)
    const logs = resp.receipt.logs
    const gameResult = logs[1].args["1"]
    
    const randomDice = Number(gameResult[3])
    const status = gameResult[4]
    let expectedBalance

    if(randomDice>=4) {
      assert.isTrue(status,"Big bet status should be win")   
      expectedBalance = currentBalance.add(betToken).sub(betFee)
    } else {
      assert.isFalse(status,"Big bet status should be lose")
      expectedBalance = currentBalance.sub(betToken).sub(betFee)
    }


    const newBalance = await casinoDiceTokenInstance.balanceOf(accounts[0])
    assert.equal(newBalance.toString(),expectedBalance.toString(), "Incorrect CDT balance");


  });

  
  it("AS a player, I can see all transactions", async () => {
    const casinoDiceTokenInstance = await CasinoDiceToken.deployed();

    const receipt = await casinoDiceTokenInstance.paginatedGames(10,1)
    
    assert.equal(1,receipt.length);

  });

  it("AS a player, I can withdraw all my CDT tokens", async () => {
    const casinoDiceTokenInstance = await CasinoDiceToken.deployed();

    const balance = await casinoDiceTokenInstance.balanceOf(accounts[0])
    const ethBalance = balance.div(toBN(exchangeRate));

    const initialBalance = await web3.eth.getBalance(accounts[0])
    
    

    const receipt = await casinoDiceTokenInstance.withdraw()
    
    const gasUsed = receipt.receipt.gasUsed
    const gasPrice = await web3.eth.getGasPrice()
    const gasCost = gasUsed*Number(gasPrice)

    
    const expectedBalance = toBN(initialBalance).add(ethBalance).sub(toBN(gasCost)).toString()

    const currentBalance = await web3.eth.getBalance(accounts[0])

    assert.equal(currentBalance,expectedBalance, "Incorrect ETH balance");

    
    const newBalance = await casinoDiceTokenInstance.balanceOf(accounts[0])
    
    assert.equal(newBalance,"0", "Incorrect CDT balance");

  });

  
});
