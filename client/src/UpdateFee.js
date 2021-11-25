import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

function UpdateFee({metamask,web3,contract}) {
    const [existingFee, setExistingFee] = useState('')
    const [newFee, setNewFee] = useState('')
    const [newFeeToken, setNewFeeToken] = useState('')
    
    
    useEffect(() => {
        if(newFee) {
            setNewFeeToken(web3.utils.toWei(newFee,'ether'))
        }
    }, [newFee])

    useEffect(() => {
        async function init() {            
            const _fee = await contract.methods.getBetFee().call()
            setExistingFee(web3.utils.fromWei(_fee,'ether'))
            setNewFee(web3.utils.fromWei(_fee,'ether'))
            console.log(_fee)
        }
        if(contract) {
            init()
        }
    }, [contract])
    const submit =  async (e) => {
        e.preventDefault()
        if(newFeeToken!==existingFee) {
            await contract.methods.updateBetFee(newFeeToken).send({ from: metamask.address })
            alert('Successfully update')
        } else {
            alert('No update')
        }
        
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>Existing Bet Fee (CDT) </label>
                    <input value={existingFee} type='number' readOnly />
                </div>
                <div>
                    <label>New Bet Fee (CDT)</label>
                    <input value={newFee} type='number' min='0.1'  step='0.1' onChange={(e) => setNewFee(e.target.value)} />
                </div>
                <button>Update</button>
            </form>
        </div>
    )
}

UpdateFee.propTypes = {

}

export default UpdateFee

