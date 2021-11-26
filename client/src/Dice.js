import React, { useState, useEffect, useRef } from 'react';
import { useGlobalState } from './Context';


function BetRequestContainer({betToken, betType, betValue, onChangeBetValue,onChangeToken, setError}) {

    let betTypeItem = <><input  className='nes-input' type="number" min="1" max="6" value={betValue} onChange={(e) => onChangeBetValue(e.target.value)} /> [1 - 6]</>
    if(betType==="lowHigh") {
        betTypeItem = <>
            <label>
            <input className='nes-radio is-dark' type="radio" value="0" checked={betValue ==0}  onChange={(e) => onChangeBetValue(e.target.value)} required />  
            <span>Low [1 - 3]</span>
            </label>
            <label>
            <input className='nes-radio is-dark' type="radio" value="1" checked={betValue ==1}  onChange={(e) => onChangeBetValue(e.target.value)} required />  
            <span>High [4 - 6]</span>
            </label>
            
        </>
    }

    return (
        <>
        <div className="nes-container is-dark with-title">
                    <p className="title">Bet Value</p>
                    <p>
                    {betTypeItem}
                    </p>
        </div>
        <div className="nes-container is-dark with-title">
                    <p className="title"><i className="nes-icon is-small coin"></i> Bet Amount</p>
                    <p className='nes-field is-inline'>
                    <input className='nes-input' type="number" min="1" max="1000" value={betToken} onChange={(e) => onChangeToken(e.target.value)} /> 
                    <span className='nes-text is-warning'>CDT</span>
                    </p>
        </div>
        </>
    )
}

const Dice = ({web3, onRollDice, contract, setError, balance}) => {

    const {setShowLoading} = useGlobalState();
    
    const [existingFee, setExistingFee] = useState('')

    const [betRequest, setBetRequest] = useState({
        betType:"lowHigh",
        betValue:'0',
        betToken:'1',
        riskReward:"1:1"
    })

    useEffect(() => {
        async function init() {            
            const _fee = await contract.methods.getBetFee().call()
            setExistingFee(web3.utils.fromWei(_fee,'ether'))
        }
        if(contract) {
            init()
        }
    }, [contract])

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
        setError('')
        if(balance - betRequest.betToken - existingFee < 0 ) {
            setError('Not enough CDT balance , please topup!')
        }
        else {
            try {            
                setShowLoading(true)
                await onRollDice(betRequest)
            } catch(e) {
                
                setShowLoading(false)
                if('message' in e) {
                    setError(e.message)
                } else {
                    setError(e.toString())
                }
            }
        }
    }


    return (
        <>
  
             <h3>Dicey Dice</h3>
             <form onSubmit={submit} className='main-form'>
                 
                <div className="nes-container is-dark with-title">
                    <p className="title">Game Type</p>
                    <p>
                    <label>
                    <input className='nes-radio is-dark' type="radio" name="betType" value="lowHigh" checked={betRequest.betType ==="lowHigh"}  onChange={(e) => onChangeBetType(e.target.value)} />
                    <span>Low/High</span>
                    </label>
                    <label>
                        <input className='nes-radio is-dark' type="radio" name="betType" value="guessNumber"  checked={betRequest.betType ==="guessNumber"}  onChange={(e) => onChangeBetType(e.target.value)} />
                        <span>Guess Number</span>
                    </label>
                    </p>
                </div>
                
                <div className="nes-container is-dark with-title">
                    <p className="title"> <i className="nes-icon is-small coin"></i> Bet Fee</p>
                    <p>
                    <span className='nes-text is-warning'> {existingFee} CDT</span>
                    </p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">Risk / Reward</p>
                    <p>
                    {betRequest.riskReward}
                    </p>
                </div>
                <BetRequestContainer betToken={betRequest.betToken} betType={betRequest.betType} betValue={betRequest.betValue} onChangeBetValue={onChangeBetValue} onChangeToken={onChangeToken} />

                <button className='nes-btn is-primary'><span>YOLOOOOOOOO ! </span></button>
             </form>
             
        </>
    )
}

export default Dice;