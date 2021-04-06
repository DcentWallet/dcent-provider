/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const isConnected = () => {
    return new Promise((resolve) => {resolve(true)})
}

const initialize = () => {
}

const ethereumAddress = () => {
    return new Promise((resolve) => {resolve('0x59B1e729B5c65D2c25F6A16164cF0Db0E9fA5754')})
}

const ethereumSignTransaction = (txInfo) => {
    return new Promise((resolve) => {
        resolve(
            '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0'
        )
    })
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

export default {
    isConnected,
    ethereumAddress,
    ethereumSignTransaction,
    initialize
}

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
