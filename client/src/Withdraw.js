import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from './Context';

function Withdraw({onWithdraw, balance, metamask, contract, setError}) {

    
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

    const submit = async (e) => {
        e.preventDefault()
        setShowLoading(true)
        setError('')
        try {
            await onWithdraw()
        } catch(e) {
            setShowLoading(false)
            if('message' in e) {
                setError(e.message)
            } else {
                setError(e.toString())
            }
            
        }
        
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

