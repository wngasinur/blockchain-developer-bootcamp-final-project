import React, { useContext }  from 'react';
import { useGlobalState } from './Context';

const Header = ({metamask, balance, contract}) => {
 
    const {contractAddress, setContractAddress} = useGlobalState();

    return (
        <header>
            <div>
                <h2>Casino Dice Game</h2>
                
                <span>Contract Address  : {contract?._address}</span>
            </div>
            <div style={{textAlign:'right'}}>
                <h6 title='Account'>{metamask.connected?<i className="nes-icon is-small heart"></i> :<i className="nes-icon is-small is-empty heart"></i>} : {metamask.address}</h6>
                <h6 title='CDT Tokens Balance'><i className="nes-icon is-small coin"></i> : <span className='nes-text is-warning'> {balance}  CDT </span></h6>
            </div>
            

        </header>
    )
}

Header.defaultProps = {
    metamask: {
        address:'',
        connected: false
    },
    balance: 0
}

export default Header