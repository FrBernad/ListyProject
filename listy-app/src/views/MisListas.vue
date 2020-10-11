<template>
  <v-container>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="9" md="7" lg="6">
          <div class="d-flex justify-center">
            <v-btn color="primary" x-large to="/UserHome/createList">Crear Lista</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <ListBar class="my-5" :title="Title"></ListBar>
    <ListBar class="my-5"></ListBar>
    <ListBar class="my-5"></ListBar>
  </v-container>
</template>

<script>
import ListBar from '../components/ListBar'
export default {
  name: "MisListas",
  components: {
    ListBar
  },
  data () {
    return {
      Title: 'compra semanal'
    }
  }
}
</script>

<style scoped>

</style>
