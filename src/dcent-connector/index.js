/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import DcentWebConnector from 'dcent-web-connector'
import LOG from '../utils/log'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const _ethereumKeyPath = "m/44'/60'/0'/0/0"

let _ethereumAddress = null
/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const _toHexString = (value) => {
    const hex = '0x' + parseInt(value).toString(16)
    LOG.debug('value = ', value)
    LOG.debug('hex = ', hex)
    return hex
}

const initialize = () => {
  _ethereumAddress = null
}

const isConnected = async () => {
    let info = await DcentWebConnector.info()
    LOG.debug('info = ', info)
    DcentWebConnector.popupWindowClose()
    return info.body.parameter.isUsbAttached 
}

const ethereumAddress = async (opts) => {
    let coinType = DcentWebConnector.coinType.ETHEREUM
    let keyPath = _ethereumKeyPath
    try {
        if (opts.enable || _ethereumAddress === null) {
          let address = await DcentWebConnector.getAddress(coinType, keyPath)
          LOG.debug('address = ', address)
          _ethereumAddress = address.body.parameter.address
        }
        return _ethereumAddress
    } catch (error) {
        LOG.error(error)
        throw error
    } finally {
        if (opts.needToClosePopup) {
            DcentWebConnector.popupWindowClose()
        }
    }
}

const ethereumSignTransaction = async (txInfo, chainId) => {
    LOG.debug('txInfo = ', txInfo)
    LOG.debug('chainId = ', chainId)

    let coinType = DcentWebConnector.coinType.ETHEREUM
    let nonce = _toHexString(txInfo.nonce)
    let gasPrice = _toHexString(txInfo.gasPrice)
    let gasLimit = _toHexString(txInfo.gas)
    let to = txInfo.to.toString()
    let value = txInfo.value ? _toHexString(txInfo.value) : '0x00'
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

const ethereumSignMessage = async (message) => {
    let key = _ethereumKeyPath
    try {
        let signed = await DcentWebConnector.getEthereumSignedMessage(
            message,
            key,
        )
        LOG.debug('signed = ', signed)
        if (signed.header.status === 'error') {
            throw Error(JSON.stringify(signed.body.error))
        }
        return signed.body.parameter.sign
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
    ethereumSignMessage,
    initialize,
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
