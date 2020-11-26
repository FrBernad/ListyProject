<template>
  <v-app-bar app clipped-left color="#FFFFFF" height="62px">

    <v-row align="center">

      <v-col cols="4" class="d-flex justify-start pl-4">
        <router-link to="/home">
          <v-img src="../assets/images/longlogonobg.png" contain max-width="75" max-height="40">
          </v-img>
        </router-link>
      </v-col>

      <v-col cols="6" sm="3" md="2" class="offset-md-6 offset-sm-5 offset-2 d-flex align-center justify-space-around">

        <v-btn to="/home/miPerfil" large exact text elevation="0" class="d-flex justify-space-around align-center">
          <v-avatar size="25px" class="mr-2">
            <v-img alt="profile picture"
                   class="ma-0 pa-0"
                   :src="profilePic"
                   lazy-src="../assets/images/emptyUser.png"
            />
          </v-avatar>
          <h1 class="text-body-1">{{user}}</h1>
        </v-btn>

        <v-btn @click="logout" small fab color="#FFFFFF" elevation="0">
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
      avatarUrl() {
        return this.$store.getters["user/avatarUrl"];
      },
      user() {
        return this.$store.getters["user/username"];
      },
      profilePic() {
        if (this.avatarUrl)
          return this.avatarUrl

        return require("../assets/images/emptyUser.png");
      },
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
