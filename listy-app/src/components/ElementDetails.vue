<template>
  <v-card class="pa-3">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-card-text class="ma-0 py-0">Nombre:</v-card-text>
        <v-autocomplete class="px-4 ma-0 py-0" v-model="nombre"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        color="white"
                        hide-no-data
                        hide-selected
                        item-text="Description"
                        item-value="API"
                        placeholder="Start typing to Search"
                        prepend-icon="mdi-database-search"
                        return-object></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex ma-0 pa-0 justify-start">
        <v-text-field background-color="#ffffff" dense hide-details solo label="Cantidad"
                      clearable class="px-4 ma-0" v-model="cantidad"></v-text-field>
      </v-col>
      <v-col cols="8" class="d-flex ma-0 pa-0 justify-end">
        <v-text-field background-color="#ffffff" dense hide-details solo label="Responsable"
                      clearable class="px-4 ma-0" v-model="responsable"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-textarea
          outlined
          name="input-7-4"
          v-value="aclaracion"
          label="Aclaración"
          no-resize="true"
          class="px-1"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex ma-0 pa-0 justify-start">
        <span class="px-4">Precio: {{ precio }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <a id="forgot" :class="{'text-decoration-underline':hover}" class="text-center">¿No encontraste el producto que
          buscabas?</a>
      </v-col>
    </v-row>
    <v-row class="align-center justify-end">
      <v-col cols="12" sm="8" md="6" class="d-flex align-center justify-space-around">
        <v-btn color="#212529" outlined @click="elementClose">Cerrar</v-btn>
        <v-btn color="#212529" outlined @click="elementClose">Agregar</v-btn>
      </v-col>
    </v-row>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ElementDetails",
  data() {
    return {
      nombre: '',
      cantidad: undefined,
      responsable: [],
      aclaracion: '',
      precio: undefined
    }
  },
  methods: {
    elementClose() {
      this.$emit('elementClose');
    }
  }
}
</script>

<style scoped>
#forgot {
  color: #1D50AE;
}
</style>
