<template>
  <v-overlay :value="rOn" opacity="0.6">
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="11" sm="8" md="5" lg="4">
        <v-card class="px-8 pb-8 pt-4 text-center" light >
          <v-row justify="space-between" align="center">
            <span class="text-h4 font-weight-medium black--text">Registrate</span>
            <v-icon @click="closeOverlay" small color="black">
              mdi-alpha-x-circle-outline
            </v-icon>
          </v-row>

          <v-divider class="mt-4 mb-6"/>

          <v-row align="center" justify="space-around">
            <v-col cols="12">
              <v-text-field
                label="Nombre de la lista"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Categoria"
                outlined
              ></v-text-field>
            </v-col>
            <v-btn color="success" :to="{name : 'UserHome/createList'}" large width="80%">Crear Lista</v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  </v-overlay>


</template>

<script>
export default {
name: "ListOverlay",
  props: {
    rOn: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeOverlay() {
      this.$emit('closeListOverlay');
    }
  },

}
</script>

<style scoped>

</style>
