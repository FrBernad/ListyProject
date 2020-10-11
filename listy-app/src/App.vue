<template>
  <v-fade-transition appear>
    <router-view/>
  </v-fade-transition>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      didAutoLogout() {
        return this.$store.getters["auth/didAutoLogout"];
      }
    },
    watch: {
      didAutoLogout(curValue, oldValue) {
        console.log("curr: "+curValue + " old: "+oldValue);
        console.log("watching..");
        if (curValue && curValue !== oldValue) {
          console.log("bum..");
          this.$router.replace('/');
        }
      }
    },
  }
</script>

