<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="60"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-1 font-weight-bold mb-3">
          Demo Page for D'CENT Web3 Provider
        </h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
  }
</script>
