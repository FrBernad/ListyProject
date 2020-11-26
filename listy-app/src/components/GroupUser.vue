<template>
  <v-container class="pa-0">
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-avatar size="100" class="elevation-5">
          <v-img
            :src="avatarUrl"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center pt-0">
        <h2 >{{userData.username}}</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "GroupUser",
    props: ["userData"],
    computed:{
      avatarUrl(){
        const defaultAvatar = require("../assets/images/emptyUser.png");
        return this.userData.avatarUrl ? this.userData.avatarUrl : defaultAvatar;
      }
    }
  }
</script>

<style scoped>

</style>
