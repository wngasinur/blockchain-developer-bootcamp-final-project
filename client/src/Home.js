import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dice from './Dice'


function GameResult({gameId, result, win}) {
    return (
        <>
            <div>
                <label>Game Id</label>
                <span>{gameId}</span>
            </div>
            <div>
                <label>Dice Number</label>
                <span>{result}</span>
            </div>
            <div>
                <span>{win?'Win':'Lose'}</span>
            </div>
        </>
    )
}

function Home({web3, metamask, connectMetamask, onRollDice, contract}) {

    const [gameResult, setGameResult] = useState()
    const [eventSubscribed, setEventSubscribed] = useState()

    if(metamask && metamask.connected && contract && !eventSubscribed) {
            
        const subsc = contract.events.GameResult(
            {
              filter: {}
            },
            (error, event) => {}
          )
          .on("data", (event) => {
            console.log("GameResult")
            console.log(event.returnValues.game)
            setGameResult(event.returnValues.game)
          });
          console.log('subscribe event '+subsc)
        setEventSubscribed(subsc)
    }

    useEffect(() => {
        return () => {
            if(eventSubscribed) {
                eventSubscribed.unsubscribe()
            }
        }
    }, [metamask, contract])

    
    return (
        <div>
            
            {!metamask.connected ? <button onClick={()=> connectMetamask()} >Connect to Metamask</button>: null }
            {metamask.connected ? <Dice web3={web3} onRollDice={onRollDice} />: null }

            {gameResult ? <GameResult gameId={gameResult.gameId} result={gameResult.result}  win={gameResult.win} /> :null}
        </div>
    )
}

Home.propTypes = {

}

export default Home

