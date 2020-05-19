<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="isShow" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            {{ title }}
          </v-card-title>
          <v-card-text>{{ message }}</v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue-grey darken-1" text @click="onClosed">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ProcesseStates',
    props: {
      isShow: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    },
    data () {
      return {
      }
    },
    methods: {
      onClosed () {
        this.$emit('closed')
      }
    }
  }
</script>
