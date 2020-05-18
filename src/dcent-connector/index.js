/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import DcentWebConnector from 'dcent-web-connector'
import LOG from '../utils/log'
import ChinId from './ethereum-chainid'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const _ethereumKeyPath = "m/44'/60'/0'/0/0"

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const _toHexString = (value) => {
    const hex = '0x' + parseInt(value).toString(16)
    LOG.debug('value = ', value)
    LOG.debug('hex = ', hex)
    return hex
}

const isConnected = async () => {
    let info = await DcentWebConnector.info()
    LOG.debug('info = ', info)
    DcentWebConnector.popupWindowClose()
    return info.body.parameter.isUsbAttached
}

const ethereumAddress = async () => {
    let coinType = DcentWebConnector.coinType.ETHEREUM
    let keyPath = _ethereumKeyPath
    let address = await DcentWebConnector.getAddress(coinType, keyPath)
    LOG.debug('address = ', address)
    DcentWebConnector.popupWindowClose()
    return address.body.parameter.address
}

const ethereumSignTransaction = async (txInfo) => {
    LOG.debug('txInfo = ', txInfo)

    let coinType = DcentWebConnector.coinType.ETHEREUM
    let nonce = _toHexString(txInfo.nonce)
    let gasPrice = _toHexString(txInfo.gasPrice)
    let gasLimit = _toHexString(txInfo.gas)
    let to = txInfo.to.toString()
    let value = _toHexString(txInfo.value)
    let data = txInfo.data || ''
    let key = _ethereumKeyPath
    let chainId = ChinId.MAINNET
  
    LOG.debug('nonce = ', nonce)
    LOG.debug('typeof nonce = ', typeof nonce)
    LOG.debug('value = ', value)
    LOG.debug('typeof value = ', typeof value)

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
