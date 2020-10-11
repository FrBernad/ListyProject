<template>
    <v-card class="pa-1 v-flex align-center justify-center border" elevation="0"  width=90%>
      <v-alert outlined color="primary">
      <v-row class="align-center  v-flex">
        <v-col cols="8">
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="listname"
                    :rules="nameRules"
                    :counter="20"
                    label="* Nombre de la lista"
                    required
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    label="Categoría"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
        <v-col class="align-right justify-right" cols="2">
          <v-btn color="primary" x-large to="/home/createList">Crear Lista</v-btn>
        </v-col>
      </v-row>  </v-alert>

    </v-card>

</template>

<script>
export default {
name: "CreateListOverlay",
  data () {
    return {
      valid: false,
      listname: '',
      nameRules: [
        v => !!v || 'Se requiere el nombre de la lista',
        v => v.length <= 20 || 'El nombre es muy largo',
      ]
    }
  }
}
</script>

<style scoped>

</style>
