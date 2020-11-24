<template>
  <v-container fill-height fluid>
    <v-row align="center">
      <v-col cols="12" lg="6">
        <v-container class="d-flex justify-center justify-lg-start ml-lg-7">
          <v-img src="../assets/images/longlogonobg.png" lazy-src="../assets/images/longlogonobg.png" contain
                 :max-width="this.$vuetify.breakpoint.smAndDown ? '300':'450'"
                 max-height="200">
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
        <v-container class="d-flex justify-center justify-lg-start ml-lg-7">
          <p class="text-h5 text-sm-h4 font-weight-medium text-lg-left text-center px-lg-5 mx-sm-6 mx-lg-0">
            Listy te ayuda a organizar tus listas de compra de manera simple, rápida y compartida.</p>
        </v-container>
      </v-col>
      <v-col cols="12" lg="6" class="pt-0 pt-sm-3">
        <Login></Login>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Login from '../components/Login'

  export default {
    name: 'LandingPage',
    components: {
      Login
    }
  }
</script>

<style scoped>
  * {
    background-color: #DEE2E6;
  }
</style>
