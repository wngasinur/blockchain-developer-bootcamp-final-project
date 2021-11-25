import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from './Context';

function Withdraw({onWithdraw, balance, metamask, contract}) {

    
    const {setShowLoading} = useGlobalState();
    const [eventSubscribed, setEventSubscribed] = useState()

    if(metamask && metamask.connected && contract && !eventSubscribed) {
            
        const subsc = contract.events.WithdrawSuccessful(
            {
              filter: {}
            },
            (error, event) => {}
          )
          .on("data", (event) => {
              console.log('ahaaa' + event)
            setShowLoading(false)
            
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

    const submit = (e) => {
        e.preventDefault()
        setShowLoading(true)
        console.log('withdraw')
        onWithdraw()
    }

    return (
        <>
            {balance != 0? <><h4>I want my money back ! </h4>
            <form onSubmit={submit} className='main-form'>
                <button className='nes-btn is-error'>Withdraw</button>
            </form></> : null}
            {balance == 0? <><h4 className='nes-text is-error'>You are bankrupt !</h4></> : null}
        </>
    )
}

Withdraw.propTypes = {

}

export default Withdraw

