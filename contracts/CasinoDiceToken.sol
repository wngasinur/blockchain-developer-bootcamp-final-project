// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CasinoDiceToken is ERC20, Ownable {

    struct BetRequest {
        string betType;
        uint betValue;
        uint256 betToken;
    }
    
    struct Game {
        uint256 gameId;
        address player;
        uint date;
        uint result;
        bool win;
        BetRequest betRequest;
    }
        
    event WithdrawSuccessful(address indexed from, uint256 amount);
    event TopupSuccessful(address indexed from, uint256 amount);
    event UpdateBetFeeSuccessful(address indexed from, uint256 amount);
    event GameResult(address indexed from, Game game);

    uint256 private exchangeRate = 1000;

    uint256 private _betFee;
    uint256 private currentGameId;
    Game[] private games;

    constructor() ERC20("Casino Dice Token", "CDT") payable{
        _mint(msg.sender, 1000 * (10**uint256(decimals())));
        _betFee = 5 * (10**uint256(decimals()-1));
    }

    function updateBetFee(uint256 _tokenAmount) public onlyOwner {
        _betFee = _tokenAmount;
        emit UpdateBetFeeSuccessful(msg.sender,_tokenAmount);
    }

    function _preValidateBuy(address _sender, uint256 _weiAmount) internal pure
    {
        require(_sender != address(0));
        require(_weiAmount != 0);
    }

    function _preValidateRoll(address _sender, uint256 _tokenAmount) internal view
    {
        require(_sender != address(0));
        uint256 balance = balanceOf(msg.sender);
        require(balance >= _tokenAmount, "Insufficient Balance");
    }

    function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256)
    {
        return _weiAmount * exchangeRate;
    }

    function _getEthAmount(uint256 _cdtAmount) internal view returns (uint256) {
        return _cdtAmount / exchangeRate;
    }

    function buy() external payable {
        // uint minAmount = 1 * (10 ** uint256(decimals() - 3));
        // assert(msg.value >  minAmount);
        _preValidateBuy(msg.sender, msg.value);
        uint256 tokenAmount = _getTokenAmount(msg.value);

        _mint(msg.sender, tokenAmount);
        emit TopupSuccessful(msg.sender, tokenAmount);
    }

    function withdraw() external {
        uint256 balance = balanceOf(msg.sender);
        assert(balance > 0);
        _burn(msg.sender, balance);
        uint256 ethAmount = _getEthAmount(balance);
        payable(msg.sender).transfer(ethAmount);
        
        emit WithdrawSuccessful(msg.sender, balance);
    }


    function roll(BetRequest calldata betRequest) external returns (Game memory game) {
        
        _preValidateRoll(msg.sender, betRequest.betToken);
        uint random = _triggerRandom();
        bool isBigRandom = random >=4 ? true : false;
        bool win = false;
        uint256 betFee = getBetFee();
        uint winMultiplier = 1;
        if(_compareString(betRequest.betType,"lowHigh")) {
            bool isBigAnswer = betRequest.betValue == 1 ? true : false;
            win = isBigAnswer == isBigRandom ? true : false;
        }
        else if(_compareString(betRequest.betType,"guessNumber")) {
            win = betRequest.betValue == random ? true : false;
            winMultiplier = 6;
        }
        else {
            require(false, "Invalid betType");
        }

        if(win) {
            _mint(msg.sender, (betRequest.betToken * winMultiplier) - betFee);
        } else {
            _burn(msg.sender, betRequest.betToken + betFee);
        }
        
        game = Game(currentGameId, msg.sender, block.timestamp, random, win, betRequest);
        games.push(game);
        currentGameId = currentGameId + 1;

        emit GameResult(msg.sender, game);
        
    }



    function paginatedGames(uint _resultsPerPage, uint _page) external view returns (Game[] memory) {
        
        uint256 count = games.length;

        if(count==0) {
            return new Game[](0);
        }   

        uint256 pageEnd = ((_page - 1) * _resultsPerPage);
        
        if(count > pageEnd) {
          pageEnd = count - pageEnd;
        } else {
          pageEnd = count;
        }

        uint counter = 0;

        uint arraySize = pageEnd > _resultsPerPage ? _resultsPerPage : pageEnd;
        Game[] memory result = new Game[](arraySize);
        while(counter<_resultsPerPage) {
           pageEnd--;
           result[counter] = games[pageEnd];
           if(pageEnd == 0){
             break;
           }
           
           counter++;
        }
       
        return result;
    }
    
    function getBetFee() public view returns (uint256) {
        return _betFee;
    }

    function _triggerRandom() internal view returns (uint256) {
        uint random = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
        uint randomDice = random % 6;
        return randomDice + 1;
    }

    function _compareString(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a))==keccak256(abi.encodePacked(b));
    }
}
