<template>
  <v-card color="#FFFFFF" class="ma-5 pa-5 mx-auto" elevation="10" outlined max-width="80%" :to="{
    path: '/home/list',
    query:{listId: data[1].id}
  }">
    <v-row>
      <v-col class="d-flex justify-start align-center pa-4">
        <span class="pl-4">{{data[1].name}}</span>
      </v-col>
      <v-col cols="2" class="d-flex justify-center align-center pa-4">
        <v-icon class="pr-4">mdi-heart</v-icon>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'FavotitePreview',
  props: ['data']
}
</script>

<style scoped>

</style>
