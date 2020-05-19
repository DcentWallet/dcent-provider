<template>
  <v-container>
    <v-row class="text-right">
      <v-col class="mb-4">
        <v-btn text outlined class="subheading" :href="explorerUrl" target="_blank">
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
    <div v-for="(test, index) in testCases" :key="index">
      <v-row class="text-center">
        <v-col>
          <v-btn dark min-width="50%" @click="test.onClick">
            <span class="btn-test">{{ test.name }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <ModalInProgress
      :is-in-progress="isInProgress"
    />
    <ModalProcessStates
      :is-show="isModalUp"
      :title="modalTitle"
      :message="modalMessage"
      @closed="onClosed"
    />
  </v-container>
</template>

<script>
  import Web3 from 'web3'
  import EthGasStation from '../apis/ethgasstation-info'
  import Convert from '../plugins/convert'
  import ModalProcessStates from './modal/ProcesseStates'
  import ModalInProgress from './modal/InProgress'

  export default {
    name: 'DemoFunction',
    components: {
      ModalInProgress,
      ModalProcessStates,
    },
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
        gasPrice: 0,
        isModalUp: false,
        isInProgress: false,
        modalTitle: 'TEST',
        modalMessage: 'TEST MESSAGE',
        testCases: [
          { 
            name: 'eth.sendTransaction', 
            onClick: this.testSendTransaction
          },
          {
            name: 'eth.sign', 
            onClick: this.testSign
          },
          { 
            name: 'eth.signTransaction', 
            onClick: this.testSignTransaction
          },
          { 
            name: 'eth.personal.sign', 
            onClick: this.testPersonalSign
          },
        ]
      }
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

    created() {
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

    methods: {
      readyToProcess: function () {
        this.isInProgress = true
      },

      showResult: function (title, message) {
        this.modalTitle = title
        this.modalMessage = message
        this.isModalUp = true
        this.isInProgress = false
      },

      onClosed: function () {
        console.log('onClosed')
        this.isModalUp = false
      },

      testSendTransaction: async function () {
        console.log('testSendTransaction')
        this.readyToProcess()
        const tx = this.selfTransferTx
        let resultMessage = ''
        try {
          const receipt = await this.web3.eth.sendTransaction(tx)
          const txhash = receipt.transactionHash
          console.log('txhash = ', txhash)
          resultMessage = 'txid : ' + txhash
        } catch (error) {
          resultMessage = 'error : ' + error.message
        }
        this.showResult('eth.sendTransaction()', resultMessage)
      },

      testSign: async function () {
        console.log('testSign')
        this.readyToProcess()
        const message = "Hello D'CENT"
        let resultMessage = ''
        try {
          const signature = await this.web3.eth.sign(message, this.address)
          console.log('signature = ', signature)
          resultMessage = 'signature : ' + signature
        } catch (error) {
          resultMessage = 'error : ' + error.message
        }
        this.showResult('eth.sign()', resultMessage)
      },

      testSignTransaction: async function () {
        console.log('testSignTransaction')
        this.readyToProcess()
        const tx = this.selfTransferTx
        let resultMessage = ''
        try {
          const signedTx = await this.web3.eth.signTransaction(tx)
          console.log('signedTx = ', signedTx)
          resultMessage = 'signedTx : ' + JSON.stringify(signedTx)
        } catch (error) {
          resultMessage = 'error : ' + error.message
        }
        this.showResult('eth.signTransaction()', resultMessage)
      },

      testPersonalSign: async function () {
        this.readyToProcess()
        const message = "Hello D'CENT for Personal Signature"
        let resultMessage = ''
        try {
          const signature = await this.web3.eth.personal.sign(message, this.address, 'password123!')
          resultMessage = 'signature : ' + signature
        } catch (error) {
          resultMessage = 'error : ' + error.message
        }
        this.showResult('eth.personal.sign()', resultMessage)
      },
    }
  }
</script>

<style lang="scss" scoped>
.btn-test {
    text-transform: none
}
</style>