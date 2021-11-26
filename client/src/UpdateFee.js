import React, {useEffect, useState} from 'react'
import { useGlobalState } from './Context'
function UpdateFee({metamask,web3,contract, setError}) {
    const [existingFee, setExistingFee] = useState('')
    const [newFee, setNewFee] = useState('')
    const [newFeeToken, setNewFeeToken] = useState('')
    const [eventSubscribed, setEventSubscribed] = useState()
    const {setShowLoading} = useGlobalState();

    if(metamask && metamask.connected && contract && !eventSubscribed) {
            
        const subsc = contract.events.UpdateBetFeeSuccessful(
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
        setError('')
        if(newFeeToken!==existingFee) {
            try {
                setShowLoading(true)
                await contract.methods.updateBetFee(newFeeToken).send({ from: metamask.address })
            } catch(e) {
                setShowLoading(false)
                if('message' in e) {
                    setError(e.message)
                } else {
                    setError(e.toString())
                }
            }
            
        } else {
            alert('No update')
        }
        
    }

    return (
        <>
            <h4>Update Bet Fee </h4>
            <form onSubmit={submit}>
                <div className="nes-container is-dark with-title">
                    <p className="title">Existing Fee (CDT)</p>
                    <p>
                    <input  className='nes-input is-disabled'  value={existingFee} type='number' readOnly disabled />
                    </p>
                </div>
                <div className="nes-container is-dark with-title">
                    <p className="title">New Fee (CDT)</p>
                    <p>
                    <input  className='nes-input' value={newFee} type='number' min='0.1'  step='0.1' onChange={(e) => setNewFee(e.target.value)} />
                    </p>
                </div>
                <button  className='nes-btn is-success'>Update</button>
            </form>
        </>
    )
}

UpdateFee.propTypes = {

}

export default UpdateFee

