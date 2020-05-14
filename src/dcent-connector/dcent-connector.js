/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import DcentWebConnector from 'dcent-web-connector'
import LOG from '../utils/log'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const isConnected = async () => {
    let info = await DcentWebConnector.info()
    LOG.debug('info = ', info)
    DcentWebConnector.popupWindowClose()
    return info.body.parameter.isUsbAttached
}

const ethereumAddress = async () => {
    let coinType = DcentWebConnector.coinType.ETHEREUM
    let keyPath = "m/44'/60'/0'/0/0"
    let address = await DcentWebConnector.getAddress(coinType, keyPath)
    LOG.debug('address = ', address)
    DcentWebConnector.popupWindowClose()
    return address.body.parameter.address
}

const ethereumSignTransaction = async (txInfo) => {
    LOG.debug('txInfo = ', txInfo)

    let coinType = DcentWebConnector.coinType.ETHEREUM
    let nonce = txInfo.nonce
    let gasPrice = txInfo.gas_price
    let gasLimit = txInfo.gas_limit
    let to = txInfo.to
    let value = txInfo.value
    let data = txInfo.data
    let key = txInfo.key
    let chainId = Number(txInfo.chain_id)
  
    try {
        let signedTx = await DcentWebConnector.getEthereumSignedTransaction(
            coinType,
            nonce,
            gasPrice,
            gasLimit,
            to,
            value,
            data,
            key,
            chainId
        )
        LOG.debug('signedTx = ', signedTx)
        return '0x' + signedTx.body.parameter.signed
    } catch (error) {
        LOG.error(error)
        throw error
    } finally {
        DcentWebConnector.popupWindowClose()
    }
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

export default {
    isConnected,
    ethereumAddress,
    ethereumSignTransaction,
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
