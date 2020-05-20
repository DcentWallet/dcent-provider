# dcent-provider

This package is ethereum web3 provider of D'CENT Biometric Wallet.
It is the wrapping package communicating with [`dcent-web-connector`](https://github.com/DcentWallet/dcent-web-connector).

## Prerequisite

* [D'CENT Biometric Wallet](https://dcentwallet.com/products/BiometricWallet) device

## Installation

```sh
npm i dcent-provider
```

## Usage

### Create provider

```js
import DcentProvider from 'dcent-provider'

const provider = new DcentProvider({
    rpcUrl: "YOUR_RPC_URL",   // required
    chainId: 1, // (optional) default = 1
})

const account = await provider.enable()
const tx = {
    from: account[0],
    gasPrice: "2000000000",
    gas: "21000",
    to: account[0],
    value: "0",
    data: ""
}
const receipt = await provider.send('eth_sendTransaction', tx)
```

### Set provider on web3js

```js
import Web3 from 'web3'

const web3 = new Web3(provider)
const accounts = await web3.eth.getAccounts()
const tx = {
    from: accounts[0],
    gasPrice: "2000000000",
    gas: "21000",
    to: account[0],
    value: "0",
    data: ""
}
const receipt = await web3.eth.sendTransaction(tx)
```

## Build & Test

### build for production

```sh
npm run build
```

### build for development

```sh
npm run build-dev
```

### test

```sh
npm run test
```
