<template>
  <v-container>
    <v-card>
      <v-row align="start" justify="center">
        <v-col cols="10">
          <v-text-field v-model="title" placeholder="title" @click="createList"></v-text-field>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-btn>CREATE</v-btn>
        </v-col>

        <v-col cols="12">
          <v-divider class="my-4"/>
        </v-col>

        <v-col cols="10">
          <v-text-field v-model="item" placeholder="item" @click="addItem"></v-text-field>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-btn>ADD</v-btn>
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
        title: ""
      }
    },
    methods: {
      async createList() {
        try {
          await this.$store.dispatch("createList",{name:this.title});
        } catch (e) {
          console.log(e);
        }
      },
       async addItem() {
        try {
          await this.$store.dispatch("createList",{
            listName:this.title,
            item:this.item
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
