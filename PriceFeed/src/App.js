import React, { useState, useEffect } from "react";
import Web3 from "web3";
import livePrice from "./build/contracts/livePrice.json";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BounceLoader } from "react-spinners";
import "./App.css";

function App() {
  const [ethPricing, setEthPricing] = useState("");
  const [ethAPR30, setEthAPR30] = useState("");
  const [ethAPR90, setEthAPR90] = useState("");
  const [ethAPRVol, setEthAPRVol] = useState("");
  const [linkLivePricing, setlinkLivePricing] = useState("");
  const [linkLive24, setlink24] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedToken, setSelectedToken] = useState("ETH");

  const formatValue = (value) => {
    const floatValue = parseFloat(value);
    const formattedValue = (floatValue * 1e10).toFixed(5);
    return formattedValue;
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    const RPC_URL =
      "https://sepolia.infura.io/v3/ADD_YOUR_NODE";
    const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));
    const networkId = await web3.eth.net.getId();
    const networkData = livePrice.networks[networkId];

    if (networkData) {
      const abi = livePrice.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);

      const ethPrice = await contract.methods.getEthPrice().call();
      setEthPricing(
        formatValue(web3.utils.fromWei(ethPrice.toString(), "ether"))
      );

      const apr30 = await contract.methods.getEthAPR30Day().call();
      setEthAPR30(formatValue(web3.utils.fromWei(apr30.toString(), "ether")));

      const apr90 = await contract.methods.getEthAPR90Day().call();
      setEthAPR90(formatValue(web3.utils.fromWei(apr90.toString(), "ether")));

      const aprVol = await contract.methods.getEthAPR24Volatility().call();
      setEthAPRVol(formatValue(web3.utils.fromWei(aprVol.toString(), "ether")));

      const linkPrice = await contract.methods.getLinkPrice().call();
      setlinkLivePricing(
        formatValue(web3.utils.fromWei(linkPrice.toString(), "ether"))
      );

      const linkPriceAPR = await contract.methods
        .getLinkAPR24Volatility()
        .call();
      setlink24(
        formatValue(web3.utils.fromWei(linkPriceAPR.toString(), "ether"))
      );

      setLoading(false);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  useEffect(() => {
    loadBlockchainData();
    const intervalId = setInterval(loadBlockchainData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <ReactTooltip />
      <div id="particles-js"></div>
      <header className="App-header">
        <h2>{selectedToken === "ETH" ? "Ethereum" : "LINK"}</h2>

        {selectedToken === "ETH" ? (
          <div className="data-card">
            <p data-tip="Current Ethereum price in USD.">
              Ethereum Live Price: {ethPricing}
            </p>
            <p data-tip="Average Ethereum APR over the last 30 days.">
              30 Day Ethereum APR: {ethAPR30}
            </p>
            <p data-tip="Average Ethereum APR over the last 90 days.">
              90 Day Ethereum APR: {ethAPR90}
            </p>
            <p data-tip="Ethereum price volatility in the last 24 hours.">
              24hr Ethereum Volatility: {ethAPRVol}
            </p>
          </div>
        ) : (
          <div className="data-card">
            <p data-tip="Current Link price in USD.">
              LINK Live Price: {linkLivePricing}
            </p>
            <p data-tip="LINK price volatility in the last 24 hours.">
              24hr LINK Volatility: {linkLive24}
            </p>
          </div>
        )}

        <button className="fetch-button" onClick={loadBlockchainData}>
          {loading ? <BounceLoader size={24} color={"#fff"} /> : "Fetch Data"}
        </button>
        <br></br>
        <button
          className="switch-button"
          onClick={() =>
            setSelectedToken(selectedToken === "ETH" ? "LINK" : "ETH")
          }
        >
          Switch to {selectedToken === "ETH" ? "LINK" : "ETH"}
        </button>
        <footer>
          <p>
            Data sourced from the Ethereum blockchain. Refreshed every 10
            seconds.
          </p>
        </footer>
      </header>
    </div>
  );
}

export default App;
