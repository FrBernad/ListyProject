<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-container class="d-flex justify-center" fluid>
          <p class="text-h4 px-2 px-sm-0 text-center">Organiza tus compras creando tus listas</p>
        </v-container>
        <v-container class="d-flex justify-center my-10" fluid>
          <v-img src="../assets/images/list.png" contain max-width="450" max-height="200">
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-container>
        <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" sm="9" md="7" lg="6">
              <div class="d-flex justify-center">
                <v-btn color="primary" x-large width="50%" to="/UserHome/createList">Crear Lista</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Home",
  }
</script>

<style scoped>

</style>
