<template>
  <v-expansion-panel>

    <v-expansion-panel-header class="pt-0 pb-0 ">
      <v-row class="align-center  justify-center">
        <v-col cols="1">
          <v-checkbox color="#0099FF"></v-checkbox>
        </v-col>
        <v-col cols="7" class="text-start">
          <span>{{ itemName }}</span>
        </v-col>
        <v-col cols="2">
          <span>{{ quantity }}</span>
        </v-col>
        <v-col cols="2">
          <span>${{ price }}</span>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>

      <v-row>
        <v-col cols="6" class="justify-end">
          <v-card>
            <v-card-title>Aclaración</v-card-title>
            <v-card-text>{{ aclaracion }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="justify-start">
          <v-card>
            <v-card-title>Responsable</v-card-title>
            <v-card-text>{{ responsable }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-expansion-panel-content>

  </v-expansion-panel>

</template>

<script>
export default {
  name: "ListItem",
  props: {
    itemName: {
      type: String,
      default: 'Nombre de Producto'
    },
    quantity: {
      type: String,
      default: ''

    },
    price: {
      type: String,
      default: ''
    },
    responsable: {
      type: String,
      default: 'Juan, Pedro, Fran, Agus'
    },
    aclaracion: {
      type: String,
      default: 'The star is more admiral now than astronaut. colorful and nosily seismic. Rob me plunder, ye heavy-hearted reef! The resistance is a final planet.'
    },


  }
}
</script>

<style scoped>

</style>
