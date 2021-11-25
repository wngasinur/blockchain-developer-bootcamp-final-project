import React, {
  Component,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import CasinoDiceTokenContract from "./contracts/CasinoDiceToken.json";
import { web3Enabled } from "./getWeb3";

import "./App.css";
import Header from "./Header";
import { GlobalStateProvider, useGlobalState } from "./Context";
import { Link, Outlet, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Topup from "./Topup";
import Withdraw from "./Withdraw";
import Transactions from "./Transactions";
import UpdateFee from "./UpdateFee";
import Loading from "./Loading";

function App() {
  const [metamask, setMetamask] = useState({
    address: "Not connected",
    connected: false,
  });
  const [balance, setBalance] = useState(0);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState();
  const [web3, setWeb3] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [contractOwner, setContractOwner] = useState(undefined);

  useEffect(() => {
    console.log("init");
    async function init() {
      let [isEnabled, web3] = await web3Enabled();
      let contract;
      if (isEnabled) {
        contract = await initContract(web3);
        setWeb3(web3);
        setContract(contract);
        if(contract.options.address) {
          const _contractOwner = await contract.methods.owner().call()
          setContractOwner(_contractOwner);  
        } else {
          setError('Unable to find the contract, please make you sure you connect to right blockchain network')
        }
      } else {
        alert("Web3 is not enabled");
      }

      window.ethereum.on("accountsChanged", onAccountChanged.bind(this));
    }
    init();
  }, []);

  const onAccountChanged = async (accounts) => {
    const account = accounts[0];
    if (account) {
      setMetamask((previous) => ({
        ...previous,
        address: account,
      }));
    } else {
      setMetamask({ address: undefined, connected: false });
    }
    // this.setState( {accounts}, );
  };

  useEffect(() => {
    async function updateBalance(account) {
      const balance = await getBalance(contract, account);
      setBalance(balance);
    }

    if (metamask.connected) {
      updateBalance(metamask.address);
    }
  }, [metamask, events]);

  const initContract = async (web3) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = CasinoDiceTokenContract.networks[networkId];
    const contract = new web3.eth.Contract(
      CasinoDiceTokenContract.abi,
      deployedNetwork && deployedNetwork.address
    );

    return contract;
  };

  const getBalance = async (contract, account) => {
    const response = await contract.methods.balanceOf(account).call();
    const dec = await contract.methods.decimals().call();
    return response / 10 ** dec;
  };

  const connectMetamask = async () => {
    try {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        setMetamask({
          address: account,
          connected: true,
        });


        const events = [contract.events.WithdrawSuccessful,contract.events.TopupSuccessful,contract.events.GameResult]
        for(const event of events) {
          event(
            {
              filter: {}, 
              fromBlock: 0,
            },
            (error, event) => {}
          )
          .on("data", (event) => {
            console.log(event.returnValues);
            setEvents(event.returnValues);
          });
        }


      }
    } catch (e) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(e);
    }
  };

  const onRollDice = async (betRequest) => {
    const bets = {
      betType: betRequest.betType,
      betValue: betRequest.betValue,
      betToken: web3.utils.toWei(betRequest.betToken, "ether"),
    };
    const response = await contract.methods
      .roll(bets)
      .send({ from: metamask.address });
  };
  const onTopup = async (ethAmount) => {
    const response = await contract.methods
      .buy()
      .send({ from: metamask.address, value: ethAmount * 10 ** 18 });
  };
  const onWithdraw = async () => {
    const response = await contract.methods
      .withdraw()
      .send({ from: metamask.address });
  };
    
  return (
    <GlobalStateProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout metamask={metamask} balance={balance} contract={contract} contractOwner={contractOwner} error={error} />
          }
        >
          <Route
            index
            element={
              <Home
                metamask={metamask}
                web3={web3}
                connectMetamask={connectMetamask}
                onRollDice={onRollDice}
                contract={contract}
                setError={setError}
              />
            }
          />
          <Route path="topup" element={<Topup onTopup={onTopup} />} />
          <Route
            path="withdraw"
            element={<Withdraw onWithdraw={onWithdraw} />}
          />
          <Route path="transactions" element={<Transactions contract={contract} web3={web3} />} />
          <Route path="update-fee" element={<UpdateFee contract={contract} web3={web3} metamask={metamask} />} />
        </Route>
      </Routes>
    </GlobalStateProvider>
  );
}

const Layout = ({ metamask, balance, contract, contractOwner, error }) => {

  const [showBetFeeUpdate ,setShowBetFeeUpdate] = useState(false)
  useEffect(() => {
    if(metamask && metamask.connected && contractOwner) {
      setShowBetFeeUpdate(contractOwner === metamask.address);
    } else {
      setShowBetFeeUpdate(false);
    }
  }, [metamask,contractOwner])

  return (
    <>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet"></link>
      <div className="container">
        <Header metamask={metamask} balance={balance} contract={contract} />
        <nav>
          <Link to="/">Dicey Dice</Link>
          {" "}
              | <Link to="/transactions">Transactions</Link>
          {metamask.connected ? (
            <>
              {" "}
              | <Link to="/topup">Topup</Link>
            </>
          ) : null}
          {metamask.connected ? (
            <>
              {" "}
              | <Link to="/withdraw">Withdraw</Link>
            </>
          ) : null}
          {showBetFeeUpdate ? (
            <>
              {" "}
              | <Link to="/update-fee">Update Bet Fee</Link>
            </>
          ) : null}
        </nav>

        <div className="content nes-container with-title is-centered">
          <Outlet />
          
          {error ? <div><i class="nes-icon is-medium is-half heart"></i> <span class='nes-text is-error'>{error} </span></div> : null}
        </div>
        <Loading />
        
      </div>

      
    </>
  );
};

export default App;
