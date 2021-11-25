import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function Withdraw({onWithdraw}) {

    const submit = (e) => {
        e.preventDefault()
        console.log('withdraw')
        onWithdraw()
    }

    return (
        <>
            <h4>I want my money back ! </h4>
            <form onSubmit={submit} className='main-form'>
                <button class='nes-btn is-error'>Withdraw</button>
            </form>
        </>
    )
}

Withdraw.propTypes = {

}

export default Withdraw

