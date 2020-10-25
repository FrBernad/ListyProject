<template>
  <v-container fluid fill-height>
    <v-row class="align-center justify-center">
      <v-col class="d-flex align-center justify-center" cols="12">
        <p class="text-h4 px-2 px-sm-0 text-center">Organiza tus compras creando tus listas</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-img src="../assets/images/list.png" contain max-width="450" max-height="200">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0 align-center justify-center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row class="justify-center align-center">
          <v-col cols="12" sm="9" md="7" lg="6">
            <v-dialog v-model="createList" persistent width="700px" class="justify-center align-center">
              <CreateListOverlay @closeDialog="createList=false"></CreateListOverlay>
            </v-dialog>
            <div class="d-flex justify-center">
              <v-btn color="primary" x-large width="50%" @click="createList=true">Crear Lista</v-btn>
            </div>
          </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListBar from "@/components/ListBar";
import CreateList from "@/views/CreateList";
import CreateListOverlay from "@/components/CreateListDialog";

export default {
  name: "Home",
  components: {CreateListOverlay, CreateList, ListBar},
  data() {
    return {createList: false,}
  },
}
</script>

<style scoped>

</style>
