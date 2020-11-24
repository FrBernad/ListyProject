<template>
  <v-card :to="{
    path: '/home/list',
    query:{listId: data[1].id}
  }">
    <v-row>
      <v-col cols="10" class="d-flex justify-start align-center pa-4">
        <span class="pl-4">{{data[1].name}}</span>
      </v-col>
      <v-col cols="2" class="d-flex justify-center align-center pa-4">
        <v-icon>mdi-star</v-icon>
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
