<template>
  <v-card class="px-5 " elevation="10" outlined>
    <v-row>
      <v-col cols="6" class="px-5">
        <v-icon color="black">mdi-cart</v-icon>
      </v-col>
      <v-col cols="3">
        <span>Fondos: {{founds}}</span>
      </v-col>
      <v-col cols="3">
        <span class="px-12">Total: {{total}} </span>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
export default {
name: "ListFooter",
  props: {
    total: {
      type: String,
      default: ''
    },
    founds: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
