<template>
  <v-container>
    <v-row class="text-right">
      <v-col class="mb-4">
        <v-btn 
          text outlined
          class="subheading" 
          :href="explorerUrl" target="_blank"
        >
          {{ networkName }} : {{ address }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <span class="title font-weight-bold mb-3">
          Click the Button to Test
        </span>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
          <v-btn dark @click="testSendTransaction" min-width="50%">
              <span class="btn-test">eth.sendTransaction</span>
          </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
          <v-btn dark @click="testSign" min-width="50%">
              <span class="btn-test">eth.sign</span>
          </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
          <v-btn dark min-width="50%">
              <span>sign-transaction</span>
          </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
          <v-btn dark min-width="50%">
              <span>sign-transaction</span>
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Web3 from 'web3'
  import EthGasStation from '../apis/ethgasstation-info'
  import Convert from '../plugins/convert'
  export default {
    name: 'DemoFunction',
    props: {
      address: {
        type: String,
        default: 'Wallet is disconnected'
      },
      provider: {
        type: Object,
        default: undefined
      },
    },

    data() {
      return {
        web3: undefined,
        chainId: 1,
        gasPrice: 0
      }
    },

    created() {``
      if (this.provider) {
        this.web3 = new Web3(this.provider)
        this.web3.eth.net.getId()
        .then((chainId) => {
          this.chainId = chainId
        })
      }
      EthGasStation.getEthereumGasPrice()
      .then((gasPriceInfo) => {
        this.gasPrice = Convert.convertGweiToWei(gasPriceInfo.low)
      })
    },

    computed: {
      explorerUrl () {
        let baseUrl = ''
        switch(this.chainId) {
          case 1: baseUrl = 'https://etherscan.io/address/'; break
          case 3: baseUrl = 'https://ropsten.etherscan.io/address/'; break
          case 4: baseUrl = 'https://rinkeby.etherscan.io/address/'; break
          case 5: baseUrl = 'https://goerli.etherscan.io/address/'; break
          case 42: baseUrl = 'https://kovan.etherscan.io/address/'; break
        }
        return baseUrl + this.address
      },
      networkName () {
        switch(this.chainId) {
          case 1: return 'Mainnet'
          case 3: return 'Ropsten'
          case 4: return 'Rinkeby'
          case 5: return 'Goerli'
          case 42: return 'Kovan'
        }
        return ''
      },
      selfTransferTx () {
        return {
          from: this.address,
          gasPrice: this.gasPrice,
          gas: '21000',
          to: this.address,
          value: '0',
          data: ''
        }
      }
    },

    methods: {
      testSendTransaction: async function () {
        console.log('testSendTransaction')
        const tx = this.selfTransferTx
        const txhash = await this.web3.eth.sendTransaction(tx)
        console.log('txhash = ', txhash)
      },

      testSign: async function () {
        console.log('testSign')
        const message = "Hello D'CENT"
        const signature = await this.web3.eth.sign(message, this.address)
        console.log('signature = ', signature)
      }
    }
  }
</script>

<style lang="scss" scoped>
.btn-test {
    text-transform: none
}
</style>