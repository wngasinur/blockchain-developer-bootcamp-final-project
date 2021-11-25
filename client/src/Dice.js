import React, { useState } from 'react';


function BetRequestContainer({betToken, betType, betValue, onChangeBetValue,onChangeToken}) {

    let betTypeItem = <><input type="number" min="1" max="6" value={betValue} onChange={(e) => onChangeBetValue(e.target.value)} /> [1 - 6]</>
    if(betType==="lowHigh") {
        betTypeItem = <span>
            <input type="radio" value="0" checked={betValue ==="0"}  onChange={(e) => onChangeBetValue(e.target.value)} required />  Low [1 - 3]
            <input type="radio" value="1" checked={betValue ==="1"}  onChange={(e) => onChangeBetValue(e.target.value)} required />  High [4 - 6]
        </span>
    }

    return (
        <>
        <div>
              <label>Place your bet</label>
              {betTypeItem}
        </div>
        <div>
        <label>Bet Amount: </label>
            <input type="number" min="1" max="1000" value={betToken} onChange={(e) => onChangeToken(e.target.value)} /> CDT
        </div>
        </>
    )
}

const Dice = ({web3, onRollDice}) => {

    const [betRequest, setBetRequest] = useState({
        betType:"lowHigh",
        betValue:1,
        betToken:'1',
        riskReward:"1:1"
    })
    
    const onChangeBetValue = async (value) => {
        setBetRequest((previous) => ({
            ...previous, betValue: value
        }));
    }
    const onChangeBetType = async (betType) => {
        const riskReward = betType==="lowHigh" ? "1:1" : "1:6";
        
        setBetRequest((previous) => ({
            ...previous, betType, riskReward
        }));
    }
    const onChangeToken = (value) => {
        
        setBetRequest((previous) => ({
            ...previous, betToken:value
        }));
    }

    const submit = async (e) => {
        e.preventDefault()

        console.log(betRequest)

        onRollDice(betRequest)
    }


    return (
        <>
             <form onSubmit={submit}>
             <div>
                    <label>Place your bet: </label>
                </div>
                <div>
                    <label>Type of bet:</label>
                    <input type="radio" name="betType" value="lowHigh" checked={betRequest.betType ==="lowHigh"}  onChange={(e) => onChangeBetType(e.target.value)} />Low/High
                    <input type="radio" name="betType" value="guessNumber"  checked={betRequest.betType ==="guessNumber"}  onChange={(e) => onChangeBetType(e.target.value)} />Guess Number
                </div>
                <div>
                    <label>Risk / Reward: </label>
                    {betRequest.riskReward}
                </div>
                <BetRequestContainer betToken={betRequest.betToken} betType={betRequest.betType} betValue={betRequest.betValue} onChangeBetValue={onChangeBetValue} onChangeToken={onChangeToken} />

                <button>Roll Dice</button>
             </form>
        </>
    )
}

export default Dice;