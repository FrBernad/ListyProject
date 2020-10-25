<template>
  <v-container>
    <v-card>
      <v-row align="start" justify="center">
        <v-col cols="10">
          <v-text-field v-model="title" placeholder="title"></v-text-field>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-btn @click="createList">CREATE</v-btn>
        </v-col>

        <v-col cols="12">
          <v-divider class="my-4"/>
        </v-col>

        <v-col cols="10">
          <v-text-field v-model="item" placeholder="item"></v-text-field>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-btn @click="addItem">ADD</v-btn>
        </v-col>

      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: "Configuracion",
    data() {
      return {
        item: "",
        title: "",
        listId: null
      }
    },
    methods: {
      async createList() {
        try {
          this.listId = await this.$store.dispatch("lists/createList", {name: this.title});
        } catch (e) {
          console.log(e);
        }
      },
      async addItem() {
        try {
          await this.$store.dispatch("lists/addItem", {
            listId: this.listId,
            item: this.item
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>
