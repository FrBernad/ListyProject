<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
  import Footer from "./components/Footer";

  export default {
    name: 'App',
    components: {
      Footer
    },
    data: () => ({
      //
    })
  }
</script>
