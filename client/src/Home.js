import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Dice from './Dice'
import './Home.css'
import { useGlobalState } from './Context'


function GameResult({gameId, result, win, closeGameResult}) {
    
    const ddd = useRef(null);
    const [showDice, setShowDice] = useState(true);

    useEffect(() => {
        if(gameId) {
            setTimeout(()=> {
                setShowDice(false)
                ddd.current.showModal()
            }, 3000)
        } 
    }, [gameId])
    const close = () =>{
        setShowDice(true)
        closeGameResult()
    }

    return (
        <>
          {showDice ? <DiceAnimation rnd={result} />  : null}
          <section>
            <dialog className="nes-dialog is-dark is-rounded" ref={ddd}>
              <form method="dialog">
                <div>
                    <label>Game ID : {gameId}</label>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">Dice Number</p>
                    <p>{result}</p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">Result</p>
                    <p>{win ? <span className='nes-text is-success'>Win <i className="nes-icon is-medium heart"></i></span> : <span className='nes-text is-error'>Lose <i className="nes-icon is-medium is-half heart"></i></span>}</p>
                </div>
                <menu className="dialog-menu">
                    <button className="nes-btn" onClick={close}>Close 
                    </button>
                </menu>
              </form>
            </dialog>
          </section>
            
        </>
    )
}



const DiceAnimation = ({rnd}) => {

    const ddd = useRef(null);

    useEffect(() => {
        if(rnd) {
            let x,y;
            switch (rnd) {
                case 1:
                  x = 720;
                  y = 810;
                  break;
                case 6:
                  x = 720;
                  y = 990;
                  break;
                default:
                  x = 720 + (6 - rnd) * 90;
                  y = 900;
                  break;
            }
            ddd.current.style.transform = "translateZ(-100px) rotateY(" + x + "deg) rotateX(" + y + "deg)"
        }
    }, [rnd])

    return (
        <div className="panel">
        <div className="dice"  ref={ddd}>
        <div className="side one">
          <span className="dot"></span>
        </div>
        <div className="side two">
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="side three">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
        <div className="side four">
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <div className="side five">
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="kolona">
            <span className="dot"></span>
          </div>
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <div className="side six">
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="kolona">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
    )
}


function Home({web3, metamask, connectMetamask, onRollDice, contract, setError, balance}) {

    const {setShowLoading} = useGlobalState();
    const [gameResult, setGameResult] = useState()
    const [eventSubscribed, setEventSubscribed] = useState()
    const [rnd,setRnd] = useState()

    if(metamask && metamask.connected && contract && !eventSubscribed) {
            
        const subsc = contract.events.GameResult(
            {
              filter: {}
            },
            (error, event) => {}
          )
          .on("data", (event) => {
            setShowLoading(false)
            console.log("GameResult")
            console.log(event.returnValues.game)
            setGameResult(event.returnValues.game)
            
            
          });
        setEventSubscribed(subsc)
    }

    useEffect(() => {
        return () => {
            if(eventSubscribed) {
                eventSubscribed.unsubscribe()
            }
        }
    }, [metamask, contract])

    
    const closeGameResult =  () =>{
        setGameResult(undefined)
    }


    return (
        <>
        {!metamask.connected ? 
        <section className="message -right">
        <div className="nes-balloon from-right is-dark" style={{maxWidth:'820px'}}>
          <p>Please note, during your use of this site, that online gambling is an entertainment vehicle, and that it carries with it a certain degree of financial risk. Players should be aware of this risk, and govern themselves accordingly. All users of this site should exercise responsibility when playing in online casinos</p>
          <p>  <button onClick={()=> connectMetamask()} className='nes-btn is-success' >Connect to Metamask</button></p>
        </div>
        <i className="nes-charmander" style={{height:'0px'}}></i>
      </section> :null
        }
            {metamask.connected ? <Dice web3={web3} onRollDice={onRollDice} setError={setError}  balance={balance} contract={contract} />: null }
            {/* */}

            
      {/* */}
            
            
            {gameResult ? <GameResult gameId={gameResult.gameId} result={gameResult.result}  win={gameResult.win} closeGameResult={closeGameResult} /> :null}
        </>
    )
}

Home.propTypes = {

}

export default Home

