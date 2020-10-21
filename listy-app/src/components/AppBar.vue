<template>
  <v-app-bar app clipped-left dense>
    <v-row align="center">
      <v-col cols="4" class="d-flex justify-start">
        <router-link to="/home">
          <v-img src="../assets/images/longlogonobg.png" contain max-width="70" max-height="35">
          </v-img>
        </router-link>
      </v-col>
      <v-col cols="6" class="offset-2 d-flex justify-end">
        <v-btn @click="logout" class="mx-4">
          logout
        </v-btn>
        <v-btn>
          <v-spacer></v-spacer>
          <v-icon class="px-1">mdi-account</v-icon>
          {{user}}
        </v-btn>
      </v-col>
    </v-row>

  </v-app-bar>
</template>

<script>
  export default {
    name: "AppBar",
    computed:{
      user(){
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
