import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Topup({onTopup}) {
    const [cdtAmount, setCdtAmount] = useState(100)
    const [ethAmount, setEthAmount] = useState('')


    useEffect(() => {
        setEthAmount(cdtAmount / 1000)
    }, [cdtAmount])
    const submit = (e) => {
        e.preventDefault()
        console.log('topUp')
        onTopup(ethAmount)
    }

    return (
        <>
            <h4>Ka-ching ! </h4>
            <form onSubmit={submit} className='main-form'>
                
                <div className="nes-container is-dark with-title">
                    <p className="title">CDT</p>
                    <p>
                    <input className='nes-input' value={cdtAmount} type='number' min='100' max='5000' onChange={(e) => setCdtAmount(e.target.value)} />
                    </p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">Exchange Rate</p>
                    <p>
                    Exchange Rate : 1000 CDT / 1 ETH
                    </p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">ETH</p>
                    <p>
                    <input className='nes-input is-disabled'  value={ethAmount} type='number' readOnly />
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

