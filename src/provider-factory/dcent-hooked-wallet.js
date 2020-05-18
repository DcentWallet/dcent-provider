/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import HookedWalletSubprovider from 'web3-provider-engine/subproviders/hooked-wallet.js'
import DcentConnector from '../dcent-connector'
import LOG from '../utils/log'
import ChainId from './ethereum-chainid'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

class DcentHookedWallet extends HookedWalletSubprovider{
    constructor(opts) {
        super({})
        if (!opts.chainId) {
            opts.chainId = ChainId.MAINNET
        }
        this._chainId = opts.chainId
    }

    getAccounts(callback) {
        LOG.debug('this._chainId = ', this._chainId)
        DcentConnector.ethereumAddress()
        .then((address) => {
            callback(null, [address])
        })
    }

    signTransaction(tx, callback) {
        LOG.debug('ENTER : signTransaction')
        LOG.debug('tx = ', tx)

        DcentConnector.ethereumSignTransaction(tx, this._chainId)
        .then((signedTx) => {
            callback(null, signedTx)
        }).catch((error) => {
            callback(error)
        })
    }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

export default DcentHookedWallet

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
