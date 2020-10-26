<template>

  <v-fade-transition appear>
    <v-container fluid style="height:100%">
      <v-card class="pa-5" height="90%" elevation="10" outlined>

        <!--LIST HEADER-->
        <v-row class="align-center justify-center">
          <v-col cols="12" sm="8" class="d-flex align-center justify-start">
            <h1>{{listName}}</h1>
          </v-col>

          <v-col cols="12" sm="4" class="d-flex align-center justify-space-around">
            <v-btn icon color="#000000">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="#000000">
              <v-icon>mdi-star</v-icon>
            </v-btn>
            <v-btn icon color="#000000">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn icon color="#000000">
              <v-icon>mdi-credit-card-outline</v-icon>
            </v-btn>
            <v-btn icon color="#000000">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <!--LIST ELEMETNS-->
        <v-row class="align-center  justify-center">
          <v-expansion-panels popout v-for="(item,index) of listItems" :key="index">
            <ListItem :item="item[1]"></ListItem>
          </v-expansion-panels>
        </v-row>

      </v-card>

      <v-card class="px-5 " elevation="10" outlined height="10%">
        <v-row align="center" justify="end">
          <v-col cols="6" class="d-flex justify-center align-center">
            <span>Total: ${{total}} </span>
          </v-col>
        </v-row>
      </v-card>

    </v-container>

  </v-fade-transition>

</template>

<script>
  import ListItem from "../components/ListItem";
  import {sync} from "vuex-pathify";

  export default {
    name: "EditList",

    props: ["listId"],

    components: {ListItem},

    data() {
      return {
        errorMessage: "",
        loading: false,
        addElement: false
      }
    },

    created() {
      this.$store.commit("lists/resetList");
      this.seedList();
    },

    computed: {
      ...sync("lists/*"),
      total() {
        let sum = 0;
        return this.listItems.reduce((sum, item) => sum + item[1].price * item[1].quantity, 0);
      }
    },

    methods: {
      async seedList() {
        try {
          const listData = await this.$store.dispatch("lists/getList", {listId: this.listId});
          this.$store.commit("lists/setList", listData)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
