/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

import DcentProvider from '../../src'

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */

const tx = {
    from: "0x59B1e729B5c65D2c25F6A16164cF0Db0E9fA5754",
    gasPrice: "20000000000",
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}

describe(__filename.replace(__dirname, ''), () => {
    it('simple send transaction', async (done) => {
        const provider = new DcentProvider({})
        await provider.enable()
        try {
            await provider.send('eth_sendTransaction', tx)
            done.fail()
        } catch (error) {
            // insufficient fund error because we test with dummy account
            expect(error.message).toEqual('insufficient funds for gas * price + value')
            done()
        }
    })
})

/* //////////////////////////////////////////////////////////////////////// */
/* */
/* //////////////////////////////////////////////////////////////////////// */
