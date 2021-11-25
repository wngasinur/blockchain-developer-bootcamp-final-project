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
        <div>
            <form onSubmit={submit}>
                <div>
                    <h3>Exchange Rate : 1000 CDT / 1 ETH</h3>
                </div>
                <div>
                    <label>CDT</label>
                    <input value={cdtAmount} type='number' min='100' max='5000' onChange={(e) => setCdtAmount(e.target.value)} />
                </div>
                <div>
                    <label>ETH</label>
                    <input value={ethAmount} type='number' readOnly />
                </div>
                <button>Topup</button>
            </form>
        </div>
    )
}

Topup.propTypes = {

}

export default Topup

