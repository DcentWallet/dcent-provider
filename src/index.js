/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import ProviderFactory from './provider-factory'
import DcentConnector from './dcent-connector'
import Web3ProviderEngine from 'web3-provider-engine'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const _getRpcPromiseCallback = (resolve, reject) => (error, response) => {
    error || response.error
      ? reject(error || response.error)
      : Array.isArray(response)
        ? resolve(response)
        : resolve(response.result)
}

class DcentProvider extends Web3ProviderEngine {
    constructor(opts) {
        super({})
        if (!opts) { opts = {} }
        ProviderFactory.initialize(this, opts)
        DcentConnector.initialize()
    }

    enable() {
        return new Promise((resolve) => {
            DcentConnector.ethereumAddress({needToClosePopup: true, enable: true})
            .then((address) => {
                resolve([address])
            })
        })
    }

    send(method, params) {
        if (method === 'eth_requestAccounts') {
            // REF : https://eips.ethereum.org/EIPS/eip-1102
            return new Promise((resolve) => {
              DcentConnector.ethereumAddress({needToClosePopup: true})
              .then((address) => {
                  resolve([address])
              })
          })
        }

        if (typeof params === 'undefined') {
            params = []
        } else if (!Array.isArray(params)) {
            params = [params]
        }

        let payload = {
            method,
            params
        }
        return new Promise((resolve, reject) => {
            try {
                this.sendAsync(payload, _getRpcPromiseCallback(resolve, reject))
            } catch (error) {
                reject(error)
            }
        })
    }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

export default DcentProvider

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
