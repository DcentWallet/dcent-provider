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
    let nonce = parseInt(txInfo.nonce)
    let gasPrice = parseInt(txInfo.gas_price)
    let gasLimit = parseInt(txInfo.gas_limit)
    let to = txInfo.to
    let value = parseInt(txInfo.value)
    let data = txInfo.data || ''
    let key = _ethereumKeyPath
    let chainId = ChinId.MAINNET
  
    try {
        let signedTx = await DcentWebConnector.getEthereumSignedTransaction(
            coinType,
            nonce.toString(),
            gasPrice.toString(),
            gasLimit.toString(),
            to.toString(),
            value.toString(),
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
