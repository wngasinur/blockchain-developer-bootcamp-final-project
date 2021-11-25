import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function Transactions({web3,contract}) {
    
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        async function init() {
            const resp = await getTransactions(contract)
            console.log(resp)
            setTransactions(resp)
        }
        if(contract) {
            init()
        }        
    }, [contract])
    
    
    const getTransactions = async (contract) => {
        const response = await contract.methods.paginatedGames(10, 1 ).call();
        return response;
    };
    
    return (
        <>
            <h3>Last 10 Transactions</h3>
            <div>
                 {transactions.map(( t) => 
                    <li>{t.gameId} | {t.player} | {new Date(t.date*1000).toISOString()} | {t.betRequest.betType=='guessNumber'? 'Guess Number' :'Low High'} | Bet {web3.utils.fromWei(t.betRequest.betToken,'ether')} CDT for {t.betRequest.betType=='guessNumber' ? t.betRequest.betValue : null} 
                    {t.betRequest.betType=='lowHigh' && t.betRequest.betValue =='1' ? 'High' : null}
                    {t.betRequest.betType=='lowHigh' && t.betRequest.betValue =='0' ? 'Low' : null} | Result : {t.result} | {t.win ? 'Win' :'Lose'}</li>
                  )}
                  
            </div>
        </>
    )
}

Transactions.propTypes = {

}

export default Transactions

