<template>

  <v-container fluid style="height:100%">

    <v-card class="pa-5" height="90%" elevation="10" outlined>
      <!--LOADING DIALOG-->
      <v-dialog
        v-model="loading"
        width="500px"
      >
        <v-card light color="#F8F9FA" width="500px" height="250px">
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-fade-transition>
                <v-col v-if="errorMessage" cols="8" class="d-flex align-center justify-center">
                  <h2 class="text-h5 text-center light-green--text">{{errorMessage}}</h2>
                </v-col>
              </v-fade-transition>
              <v-fade-transition>
                <v-col v-if="!errorMessage" cols="5" class="d-flex align-center justify-center">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>
                </v-col>
              </v-fade-transition>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>


      <!--LIST HEADER-->
      <v-row class="align-center  justify-center">
        <v-col cols="12" sm="8" class="d-flex align-center justify-start">
          <h1>{{ listName }}</h1>
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
      <v-row class="align-center justify-center">
        <v-col cols="12">
          <v-dialog v-model="addElement" max-width="600px">
            <template v-slot:activator="{on, attrs}">
              <v-btn color="rgba(227,237,247,1)" block v-bind="attrs" v-on="on">
                <v-icon color="#69A74E" size="x-large">mdi-plus-circle</v-icon>
                <span class="font-weight-bold ">Agregar elemento</span>
              </v-btn>
            </template>
            <ElementDetils @elementClose="addElement=false"></ElementDetils>
          </v-dialog>
        </v-col>
      </v-row>

      <v-row class="align-center  justify-center">
        <v-expansion-panels popout v-for="(item,index) in listItems" :key="index">
          <ListItem :item="item"></ListItem>
        </v-expansion-panels>
      </v-row>

    </v-card>

    <v-card class="px-5 " elevation="10" outlined height="10%">
      <v-row align="center" justify="center">
        <v-col cols="6" class="d-flex justify-start align-center">
          <v-btn @click="createList">
            <v-icon left color="black">mdi-cart</v-icon>
            CREATE
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex justify-center align-center">
          <span>Total: ${{total}} </span>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
  import ListItem from "../components/ListItem";
  import ElementDetails from "../components/ElementDetails";
  import {get} from "vuex-pathify";

  export default {
    name: "createList",
    components: {ListItem, ElementDetails},
    data() {
      return {
        total: 0,
        errorMessage: "",
        loading: false,
        addElement: false
      }
    },

    computed: {
      ...get("lists/*")
    },

    methods: {
      async createList() {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        try {
          this.loading = true;
          await sleep(1000);
          await this.$store.dispatch("lists/createList", {
            name: this.title,
            items: this.listItems
          });
          this.errorMessage = "Lista creada exitosamente.";
          await sleep(2000);
          this.loading = false;
          this.errorMessage = "";
        } catch (e) {
          this.errorMessage = "Error a crear la lista.";
          await setTimeout(() => {
            this.errorMessage = "";
            this.loading = false;
          }, 2000);
          console.log(e);
        }
      },
    }
  }
</script>

<style scoped>

</style>
