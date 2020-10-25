<template>
  <v-card class="pa-5">
    <v-row class="justify-center align-center">
      <v-col cols="12">
        <v-autocomplete v-model="item.name"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        label="Nombre"
                        hide-no-data
                        item-text="Description"
                        item-value="API"
                        placeholder="Comienza a escribir para buscar el producto"
                        prepend-icon="mdi-database-search"
                        return-object>
        </v-autocomplete>
      </v-col>
    </v-row>

    <v-row class="justify-center align-center">
      <v-col cols="4" class="pt-0">
        <v-text-field width="100%" background-color="#ffffff" dense hide-details solo label="Cantidad"
                      clearable v-model="item.quantity"></v-text-field>
      </v-col>
      <v-col cols="8" class="pt-0">
        <v-text-field background-color="#ffffff" dense hide-details solo label="Responsable"
                      clearable width="100%" v-model="item.responsible"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-0">
        <v-textarea
          outlined
          name="input-7-4"
          v-value="item.note"
          label="Aclaración"
          no-resize="true"
          class="px-1"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex ma-0 pa-0 justify-start">
        <span class="px-4">Precio: {{ item.price}}</span>
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
        <v-btn color="#212529" outlined @click="addElement">Agregar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ElementDetails",
  data() {
    return {
      item: {
        name: '',
        quantity: undefined,
        responsible: '',
        note: '',
        price: undefined
      },
    }
  },
  methods: {
    elementClose() {
      this.$emit('elementClose');
    },
    addElement(){
      const copy = {name:this.item.name, quantity: this.item.quantity, responsible: this.item.responsible,note:this.item.note, price: this.item.price};
      this.$store.commit('addItem',copy);
      this.elementClose();
    }
  }
}
</script>

<style scoped>
#forgot {
  color: #1D50AE;
}
</style>
