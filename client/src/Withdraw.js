import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Withdraw({onWithdraw}) {

    const submit = (e) => {
        e.preventDefault()
        console.log('withdraw')
        onWithdraw()
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <h3>Withdraw all CDT Tokens</h3>
                </div>
                <button>Withdraw</button>
            </form>
        </div>
    )
}

Withdraw.propTypes = {

}

export default Withdraw

