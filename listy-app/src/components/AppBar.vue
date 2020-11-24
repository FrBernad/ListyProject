<template>
  <v-app-bar app clipped-left height="62px">

    <v-row align="center">

      <v-col cols="4" class="d-flex justify-start pl-4">
        <router-link to="/home">
          <v-img src="../assets/images/longlogonobg.png" contain max-width="75" max-height="40">
          </v-img>
        </router-link>
      </v-col>

      <v-col cols="2" class="offset-6 d-flex align-center justify-space-around">
          <v-btn to="/home/miPerfil" large exact text elevation="0">
            <v-icon left>mdi-account</v-icon>
            {{user}}
          </v-btn>
          <v-btn @click="logout" small fab color="#E4E6EB" elevation="0">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
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
