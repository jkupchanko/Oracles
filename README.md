# Oracles

Overview
The LivePrice smart contract fetches and displays various financial metrics related to Ethereum (ETH) and Chainlink (LINK) using the Chainlink oracles.

Metrics include:

ETH/USD price
30-Day ETH APR
90-Day ETH APR
ETH-USD 24hr Realized Volatility
LINK/USD price
LINK-USD 24hr Realized Volatility

# Live Price Smart Contract

This repository contains a Solidity smart contract that uses the Chainlink oracle to retrieve various price and volatility data points for ETH and LINK.

## Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Testing](#testing)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/)
- [MetaMask](https://metamask.io/) or another web3 provider
- [Chainlink](https://chain.link/)
- Sepolia (Node)
## Setup

1. Clone this repository:

```bash
git clone https://github.com/jkupchanko/Oracles.git

Compile the contracts:

truffle compile

Create a .env file in the root directory to securely store environment variables
INFURA_API_KEY=Your_Infura_API_Key
PRIVATE_KEY=Your_Private_Key

Deploy the contract with:
truffle migrate --network sepolia

Running Tests:
truffle test

Acknowledgments
Chainlink for their oracle service
Ethereum community
All contributors and developers of this project

