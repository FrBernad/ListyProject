<template>
  <v-app-bar app clipped-left dense>
    <v-row>

    <v-app-bar-nav-icon>
    </v-app-bar-nav-icon>
      <router-link to="/UserHome">
        <v-img src="../assets/images/longlogonobg.png" contain max-width="220" max-height="50">
        </v-img>
      </router-link>
        <v-btn>

          <v-spacer></v-spacer>

            <v-icon class="px-1">mdi-account</v-icon>
            JOE
        </v-btn>
    </v-row>

  </v-app-bar>
</template>

<script>
  export default {
    name: "AppBar"
  }
</script>

<style scoped>

</style>
