# dcent-provider

This package is ethereum web3 provider of D'CENT Biometric Wallet.
It is the wrapping package communicating with `dcent-web-connector`.
For more information about `dcent-web-connector`, see DcentWallet/dcent-web-connector

## Installation

```sh
npm i dcent-provider
```

## Usage

### Create provider

```js
import DcentProvider from 'dcent-provider'

const provider = new DcentProvider({
    rpcUrl: "https://localhost:8545",   // (optional) default = infura https provider
    chainId: 1, // (optional) default = 1
})
```

### set provider on web3js

```js
import Web3 from 'web3'

const web3 = new Web3(provider)
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
