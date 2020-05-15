<template>
  <v-container>
    <v-row class="text-right">
      <v-col class="mb-4">
        <v-btn 
          text outlined
          class="subheading mb-3" 
          :href="explorerUrl" target="_blank"
        >
          {{ networkName }} : {{ address }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
        <span class="title font-weight-bold mb-3">
          Click the Button to Test
        </span>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col class="mb-4">
          <v-btn dark @click="testSendTransaction">
              <span class="mr-2">send-transaction</span>
          </v-btn>
      </v-col>
      <v-col class="mb-4">
          <v-btn dark>
              <span class="mr-2">sign-message</span>
          </v-btn>
      </v-col>
      <v-col class="mb-4">
          <v-btn dark>
              <span class="mr-2">sign-transaction</span>
          </v-btn>
      </v-col>
      <v-col class="mb-4">
          <v-btn dark>
              <span class="mr-2">sign-transaction</span>
          </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Web3 from "web3"
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
      }
    },

    data() {
      return {
        web3: undefined,
        chainId: 1,
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
    },

    computed: {
      explorerUrl () {
        switch(this.chainId) {
          case 1: return 'https://etherscan.io/address/' + this.address
          case 42: return 'https://kovan.etherscan.io/address/' + this.address
        }
        return ''
      },
      networkName () {
        switch(this.chainId) {
          case 1: return 'Mainnet'
          case 42: return 'Kovan'
        }
        return ''
      }
    },

    methods: {
      testSendTransaction() {
        console.log('testSendTransaction')
      }
    }
  }
</script>
