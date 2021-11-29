import React, { Component } from "react";

import "./App.css";
import Web3 from "web3";

import Token from "./contracts/Token.json";

class App extends Component {
  async componentDidMount() {
    await this.isEthereumBrowser()
    await this.loadBlockchainData()
  }

  async isEthereumBrowser() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Non ethereum browser detected!");
    }
  }

  async loadBlockchainData() {
    const web3  = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  
    const networkId = await web3.eth.net.getId()
    const networkData = Token.networks[networkId] 
    
    if (networkData) {
      const abi = Token.abi
      const address= networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract: contract })
    } else {
      window.alert("Smart contract not deployed!")
    }
  }

  mintToken = () => {
    this.state.contract.methods.mint(this.state.account, 3).send({ from: this.state.account })
  }

  // transferToken = () => {
  //   this.state.contract.methods.transfer(this.state.account, )
  // }

  getBalance = async () => {
    let tokens = await this.state.contract.methods.balanceOf(this.state.account).call({from: this.state.account})
    console.log(tokens)
  }

  burnToken = () => {
    this.state.contract.methods.burn(this.state.account, 1).send({ from: this.state.account })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contract: null
    }
  }


  render() {
    return (
      <div className="App">
        <h1>Good to go!</h1>
        <button onClick={this.mintToken}>Mint Tokens</button>
        <button onClick={this.getBalance}>Get Balance</button>
        <button onClick={this.burnToken}>Burn Token</button>
      </div>
    );
  }
}

export default App;
