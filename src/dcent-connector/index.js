/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import DcentWebConnector from 'dcent-web-connector'
import LOG from '../utils/log'

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

const ethereumSignTransaction = async (txInfo, chainId) => {
    LOG.debug('txInfo = ', txInfo)
    LOG.debug('chainId = ', chainId)

    let coinType = DcentWebConnector.coinType.ETHEREUM
    let nonce = _toHexString(txInfo.nonce)
    let gasPrice = _toHexString(txInfo.gasPrice)
    let gasLimit = _toHexString(txInfo.gas)
    let to = txInfo.to.toString()
    let value = _toHexString(txInfo.value)
    let data = txInfo.data || ''
    let key = _ethereumKeyPath

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
            parseInt(chainId)
        )
        LOG.debug('signedTx = ', signedTx)
        if (signedTx.header.status === 'error') {
            throw Error(JSON.stringify(signedTx.body.error))
        }
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
