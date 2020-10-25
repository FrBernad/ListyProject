<template>
  <v-card class="px-5 py-1 align-center justify-center borderCard" elevation="10" width=100%>
    <v-row class="align-center justify-center">
      <v-col cols="12">
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="listname"
                :rules="nameRules"
                :counter="20"
                label="* Nombre de la lista"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Categoría"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>

    <v-row class="align-center justify-end">
      <v-col cols="6" class="d-flex align-center justify-space-around">
        <v-btn color="primary" @click="closeDialog" x-large>Cancelar</v-btn>
        <v-btn color="primary" @click="closeDialog" x-large to="/home/createList">Crear Lista</v-btn>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
export default {
  name: "CreateListOverlay",
  data() {
    return {
      valid: false,
      listname: '',
      nameRules: [
        v => !!v || 'Se requiere el nombre de la lista',
        v => v.length <= 20 || 'El nombre es muy largo',
      ]
    }
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    }
  }
}
</script>

<style scoped>
.borderCard {
  border: solid #1D50AE;
}
</style>
