<template>
  <v-card  class="ma-5 pa-5 mx-auto" elevation="10" outlined max-width="80%">
    <v-row>
      <v-card-title>{{ data.groupName }}</v-card-title>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-btn icon @click="show = !show" >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-row>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          <ul>
            <li v-for="member in data.members">
              {{ member }}
            </li>
          </ul>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "GroupPreview",
  props: ['data'],

  data(){
    return{
      show: false,
    }
  },
}
</script>

<style scoped>

</style>
