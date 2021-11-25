import React, { useContext }  from 'react';
import { useGlobalState } from './Context';

const Header = ({metamask, balance, contract}) => {
 
    const {contractAddress, setContractAddress} = useGlobalState();

    return (
        <header>
            <h3>Casino Dice Game : {contract?._address}</h3>
            <h3>Account : {metamask.address} - Balance {balance} CDT</h3>

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