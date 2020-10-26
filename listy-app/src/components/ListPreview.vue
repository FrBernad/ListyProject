<template>
  <v-card :to="{
      path: '/home/list',
      query: {listId: data[0]}
     }">
    <v-row>
      <v-col class="d-flex justify-start align-center pa-4">
        <span class="pl-4">{{data[1].name}}</span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: "ListPreview",
    props: ["data"]
  }
</script>

<style scoped>

</style>
