<template>
  <v-app>
      <v-app-bar app color="blue-grey darken-4" dark>
          <div class="d-flex align-center">
              <v-img alt="D'CENT Logo" class="shrink mr-2" contain src="./assets/logo.png" transition="scale-transition" width="40" />
          </div>

          <v-spacer></v-spacer>

          <v-btn text @click="onClickConnect">
              <span>{{ btnConnectLabel }}</span>
          </v-btn>
      </v-app-bar>

      <v-content>
          <div v-if="isConnected">
              <DemoFunction :address="walletAddress" :provider="provider" />
          </div>
          <div v-else>
              <HelloWorld />
          </div>
      </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import DemoFunction from './components/DemoFunction'
import DcentProvider from '../../src'

export default {
    name: 'App',

    components: {
        HelloWorld,
        DemoFunction,
    },

    data() {
        return {
            provider: undefined,
            walletAddress: undefined,
            isConnected: false
        }
    },

    computed: {
        btnConnectLabel() {
            return this.isConnected ? 'Disconnect' : 'Connect'
        }
    },

    created() {
        this.provider = new DcentProvider({
            rpcUrl: process.env.VUE_APP_INFURA_RPC_URL,
            chainId: 42
        })
    },

    methods: {
        disconnectWallet() {
            this.isConnected = false
            this.walletAddress = undefined
        },

        connectWallet() {
            this.provider.enable().then((addresses) => {
                console.log('wallet addresses = ', addresses)
                if (addresses.length > 0) {
                    this.walletAddress = addresses[0]
                    this.isConnected = true
                }
            })
        },

        onClickConnect() {
            console.log('onClickConnect')
            if (this.isConnected) {
                this.disconnectWallet()
            } else {
                this.connectWallet()
            }
        }
    }
};
</script>
