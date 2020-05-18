/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import DefaultFixture from 'web3-provider-engine/subproviders/default-fixture.js'
import CacheSubprovider from 'web3-provider-engine/subproviders/cache.js'
import FilterSubprovider from 'web3-provider-engine/subproviders/filters'
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions'
import InflightCacheSubprovider from 'web3-provider-engine/subproviders/inflight-cache'
//import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet.js'
import SanitizingSubprovider from 'web3-provider-engine/subproviders/sanitizer.js'
import InfuraSubprovider from 'web3-provider-engine/subproviders/infura.js'
import FetchSubprovider from 'web3-provider-engine/subproviders/fetch.js'
import WebSocketSubprovider from 'web3-provider-engine/subproviders/websocket.js'

import DcentHookedWallet from './dcent-hooked-wallet'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

function initialize(engine, opts = {}){
  const connectionType = getConnectionType(opts)

  // static
  const staticSubprovider = new DefaultFixture(opts.static)
  engine.addProvider(staticSubprovider)

  // nonce tracker
  // engine.addProvider(new NonceTrackerSubprovider())

  // sanitization
  const sanitizer = new SanitizingSubprovider()
  engine.addProvider(sanitizer)

  // cache layer
  const cacheSubprovider = new CacheSubprovider()
  engine.addProvider(cacheSubprovider)

  // filters + subscriptions
  // only polyfill if not websockets
  if (connectionType !== 'ws') {
    engine.addProvider(new SubscriptionSubprovider())
    engine.addProvider(new FilterSubprovider())
  }

  // inflight cache
  const inflightCache = new InflightCacheSubprovider()
  engine.addProvider(inflightCache)

  // id mgmt
  /*
  const idmgmtSubprovider = new HookedWalletSubprovider({
    // accounts
    getAccounts: hookedWallet.getAccounts,
    // transactions
    processTransaction: hookedWallet.processTransaction,
    approveTransaction: hookedWallet.approveTransaction,
    signTransaction: hookedWallet.signTransaction,
    publishTransaction: hookedWallet.publishTransaction,
    // messages
    // old eth_sign
    processMessage: hookedWallet.processMessage,
    approveMessage: hookedWallet.approveMessage,
    signMessage: hookedWallet.signMessage,
    // new personal_sign
    processPersonalMessage: hookedWallet.processPersonalMessage,
    processTypedMessage: hookedWallet.processTypedMessage,
    approvePersonalMessage: hookedWallet.approvePersonalMessage,
    approveTypedMessage: hookedWallet.approveTypedMessage,
    signPersonalMessage: hookedWallet.signPersonalMessage,
    signTypedMessage: hookedWallet.signTypedMessage,
    personalRecoverSigner: hookedWallet.personalRecoverSigner,
  })
  */
  const idmgmtSubprovider = new DcentHookedWallet(opts)
  engine.addProvider(idmgmtSubprovider)

  // data source
  const dataSubprovider = opts.dataSubprovider || createDataSubprovider(connectionType, opts)
  engine.addProvider(dataSubprovider)

  // start polling
  if (!opts.stopped) {
    engine.start()
  }
}

function createDataSubprovider(connectionType, opts) {
  const { rpcUrl, debug } = opts

  // default to infura
  if (!connectionType) {
    return new InfuraSubprovider()
  }
  if (connectionType === 'http') {
    return new FetchSubprovider({ rpcUrl, debug })
  }
  if (connectionType === 'ws') {
    return new WebSocketSubprovider({ rpcUrl, debug })
  }

  throw new Error(`ProviderEngine - unrecognized connectionType "${connectionType}"`)
}

function getConnectionType({ rpcUrl }) {
  if (!rpcUrl) return undefined

  const protocol = rpcUrl.split(':')[0].toLowerCase()
  switch (protocol) {
    case 'http':
    case 'https':
      return 'http'
    case 'ws':
    case 'wss':
      return 'ws'
    default:
      throw new Error(`ProviderEngine - unrecognized protocol in "${rpcUrl}"`)
  }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

export default {
  initialize
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
