import React, { useState, useEffect } from "react";
import Web3 from "web3";

import DaiToken from "../contracts/abis/DaiToken.json";
import DappToken from "../contracts/abis/DappToken.json";
import TokenFarm from "../contracts/abis/TokenFarm.json";

function Ramper() {
  const [account, setAccount] = useState("0x0");
  const [daiToken, setDaiToken] = useState({});
  const [dappToken, setDappToken] = useState({});
  const [tokenFarm, setTokenFarm] = useState({});
  const [daiTokenBalance, setDaiTokenBalance] = useState("0");
  const [dappTokenBalance, setdappTokenBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await loadWeb3();
    await loadBlockchainData();
  }, []);
  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    const networkId = await web3.eth.net.getId();

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId];
    if (daiTokenData) {
      const daiTokenVal = new web3.eth.Contract(
        DaiToken.abi,
        daiTokenData.address
      );
      setDaiToken(daiTokenVal);
      let daiTokenBalanceVal = await daiTokenVal.methods
        .balanceOf(accounts[0])
        .call();
      setDaiTokenBalance(daiTokenBalanceVal.toString());
    } else {
      window.alert("DaiToken contract not deployed to detected network.");
    }

    // Load DappToken
    const dappTokenData = DappToken.networks[networkId];
    if (dappTokenData) {
      const dappTokenVal = new web3.eth.Contract(
        DappToken.abi,
        dappTokenData.address
      );
      setDappToken(dappTokenVal);
      let dappTokenBalanceVal = await dappTokenVal.methods
        .balanceOf(accounts[0])
        .call();
      setdappTokenBalance(dappTokenBalanceVal.toString());
    } else {
      window.alert("DappToken contract not deployed to detected network.");
    }

    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarmVal = new web3.eth.Contract(
        TokenFarm.abi,
        tokenFarmData.address
      );
      setTokenFarm(tokenFarmVal);
      let stakingBalanceVal = await tokenFarmVal.methods
        .stakingBalance(accounts[0])
        .call();
      setStakingBalance(stakingBalanceVal.toString());
    } else {
      window.alert("TokenFarm contract not deployed to detected network.");
    }
    setLoading(false);
  };
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const stakeTokens = (amount) => {
    setLoading(true);
    daiToken.methods
      .approve(tokenFarm._address, amount)
      .send({ from: account })
      .on("transactionHash", (hash) => {
        tokenFarm.methods
          .stakeTokens(amount)
          .send({ from: account })
          .on("transactionHash", (hash) => {
            setLoading(false);
          });
      });
  };

  const unstakeTokens = (amount) => {
    setLoading(true);
    tokenFarm.methods
      .unstakeTokens()
      .send({ from: account })
      .on("transactionHash", (hash) => {
        setLoading(false);
      });
  };
  const LoadingContainer = (
    <p id="loader" className="text-center">
      Loading...
    </p>
  );

  const UnLoadingContainer = (
    <div id="content" className="mt-3">
      <div className="card mb-4">
        <div className="card-body">
          <form
            className="mb-3"
            onSubmit={(event) => {
              event.preventDefault();
              let amountVal;
              amountVal = inputValue.toString();
              amountVal = Web3.utils.toWei(amountVal, "Ether");
              stakeTokens(amountVal);
            }}
          >
            <div>
              <label className="float-left">
                <b>Stake Tokens</b>
              </label>
              <span className="float-right text-muted">
                Balance: {Web3.utils.fromWei(daiTokenBalance, "Ether")}
              </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="dai_input"
                placeholder="0"
                required
              />
              <div className="input-group-append">
                <div className="input-group-text">&nbsp;&nbsp;&nbsp; mDAI</div>
              </div>
            </div>
            <button type="submit" className="submit_Button">
              STAKE!
            </button>
          </form>
          <button
            type="submit"
            className="submit_Button"
            onClick={(event) => {
              event.preventDefault();
              unstakeTokens();
            }}
          >
            UN-STAKE...
          </button>
        </div>
      </div>

      <table className="balance_table">
        <thead>
          <tr>
            <th>Staking Balance</th>
            <th>Reward Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Web3.utils.fromWei(stakingBalance, "Ether")} mDAI</td>
            <td>{Web3.utils.fromWei(dappTokenBalance, "Ether")} DAPP</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main
          role="main"
          className="col-lg-12 ml-auto mr-auto"
          style={{ maxWidth: "600px" }}
        >
          <div className="content mr-auto ml-auto">
            <a
              href="http://www.dappuniversity.com/bootcamp"
              target="_blank"
              rel="noopener noreferrer"
            ></a>

            {loading ? LoadingContainer : UnLoadingContainer}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Ramper;
