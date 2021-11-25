import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function Transactions({web3,contract}) {
    
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        async function init() {
            const resp = await getTransactions(contract)
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
            <h4>Last 10 YOLOers</h4>
            <div>
            <div className="nes-table-responsive">
                <table className="nes-table is-bordered is-dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>YOLOer</th>
                        <th>Date/Time</th>
                        <td>Game Type</td>
                        <th>Bet</th>
                        <th>Result</th>
                        <th>W/L</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map(( t) => 
                    <tr><td>{t.gameId}</td><td>...{t.player.substr(38)}</td><td>{new Date(t.date*1000).toLocaleString()}</td> 
                    <td>{t.betRequest.betType=='guessNumber'? 'Guess Number' :'Low High'} </td>
                    <td>{web3.utils.fromWei(t.betRequest.betToken,'ether')}<i className="nes-icon is-small coin"></i> => {t.betRequest.betType=='guessNumber' ? t.betRequest.betValue : null} 

                    {t.betRequest.betType=='lowHigh' && t.betRequest.betValue =='1' ? 'High' : null}
                    {t.betRequest.betType=='lowHigh' && t.betRequest.betValue =='0' ? 'Low' : null}</td>
                    <td>
                    {t.result}
                    </td>
                    <td>
                    {t.win ? <span className='nes-text is-success'>Win</span> : <span className='nes-text is-error'>Lose</span>}
                    </td>
                    </tr>
                  )}
                    </tbody>
                </table>
            </div>
                
                  
            </div>
        </>
    )
}

Transactions.propTypes = {

}

export default Transactions

