<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="isInProgress" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            In Progressing...
          </v-card-title>
          <v-card-text>
            Check your D'CENT device
          </v-card-text>
          <v-progress-linear indeterminate value="0" />
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ProcesseStates',
    props: {
      isInProgress: {
        type: Boolean,
        required: true
      },
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
