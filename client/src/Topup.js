import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from './Context'

function Topup({onTopup,setError, contract, metamask}) {
    const [cdtAmount, setCdtAmount] = useState(100)
    const [ethAmount, setEthAmount] = useState('')

    
    const {setShowLoading} = useGlobalState();
    const [eventSubscribed, setEventSubscribed] = useState()

    if(metamask && metamask.connected && contract && !eventSubscribed) {
            
        const subsc = contract.events.TopupSuccessful(
            {
              filter: {}
            },
            (error, event) => {}
          )
          .on("data", (event) => {
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


    useEffect(() => {
        setEthAmount(cdtAmount / 1000)
    }, [cdtAmount])
    const submit = (e) => {
        e.preventDefault()
        setError('')
        setShowLoading(true)
        onTopup(ethAmount)
    }

    return (
        <>
            <h4>Ka-ching ! </h4>
            <form onSubmit={submit} className='main-form'>
                
                <div className="nes-container is-dark with-title">
                    <p className="title">CDT</p>
                    <p>
                    <input className='nes-input' value={cdtAmount} type='number' min='100' max='5000' step='100' onChange={(e) => setCdtAmount(e.target.value)} />
                    </p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">Exchange Rate</p>
                    <p>
                    <span  className='nes-text is-warning'>1000 CDT</span> / 1 ETH
                    </p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">ETH</p>
                    <p>
                    <input className='nes-input is-disabled'  value={ethAmount} type='number' readOnly disabled />
                    </p>
                </div>
                <button className='nes-btn is-success'> <i className="nes-icon is-small coin"></i> Topup</button>
            </form>
        </>
    )
}

Topup.propTypes = {

}

export default Topup

