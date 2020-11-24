<template>
  <v-app-bar app clipped-left dense>

    <v-row align="center">

      <v-col cols="4" class="d-flex justify-start">
        <router-link to="/home">
          <v-img src="../assets/images/longlogonobg.png" contain max-width="70" max-height="35">
          </v-img>
        </router-link>
      </v-col>

      <v-col cols="6" class="offset-2">
        <v-tabs right background-color="#F5F5F5" color="black">
          <v-tab @click="logout">
            <v-icon left>mdi-logout</v-icon>
            Cerrar sesión
          </v-tab>
          <v-tab to="/home/miPerfil" exact>
            <v-icon left>mdi-account</v-icon>
            {{user}}
          </v-tab>
        </v-tabs>
      </v-col>

    </v-row>

  </v-app-bar>
</template>

<script>
  export default {
    name: "AppBar",
    computed: {
      user() {
        return this.$store.getters["user/username"];
      }
    },
    methods: {
      async logout() {
        try {
          await this.$store.dispatch('logout');
          await this.$router.replace('/');
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
