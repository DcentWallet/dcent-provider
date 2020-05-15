<template>
  <v-container>
    <v-row class="text-right">
      <v-col class="mb-4">
        <v-btn 
          text outlined
          class="subheading mb-3" 
          :href="'https://etherscan.io/address/'+address" target="_blank"
        >
          {{ address }}
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
      }
    },

    methods: {
      testSendTransaction() {
        console.log('testSendTransaction')
      }
    }
  }
</script>
