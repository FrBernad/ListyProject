<template>
  <v-expansion-panel>

    <v-expansion-panel-header class="pt-0 pb-0 ">
      <v-row class="align-center  justify-center">
        <v-col cols="1">
          <v-checkbox color="#0099FF"></v-checkbox>
        </v-col>
        <v-col cols="10" class="text-start">
          <span>{{ itemName }}</span>
        </v-col>
        <v-col cols="1">
          <span>{{ quantity }}</span>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>

      <v-row class="align-center  justify-center">
        <v-col cols="4">
          <v-text-field background-color="#ffffff" dense hide-details solo label="Cantidad"
                        clearable>{{ quantity }}</v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field background-color="#ffffff" dense hide-details solo label="Precio"
                        clearable>{{ price }}
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field background-color="#ffffff" dense hide-details solo label="Responsable"
                        clearable>{{ responsible }}
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field background-color="#ffffff" dense hide-details solo label="Descripcion"
                        clearable>{{ description }}
          </v-text-field>
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
    responsible: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }

  }
}
</script>

<style scoped>

</style>
