<template>

  <v-fade-transition appear>
    <v-container fluid class="backgroundColor" style="height:100%">
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
                    <h2 class="text-h5 text-center light-green--text">{{ errorMessage }}</h2>
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
        <v-row class="align-center justify-center">
          <v-col cols="12" sm="8" class="d-flex align-center justify-start">
            <v-text-field class="text-h4 font-weight-bold" @blur="$v.listName.$touch()" :error-messages="nameError"
                          v-model="listName"></v-text-field>
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
              <ElementDetails @elementClose="addElement=false"></ElementDetails>
            </v-dialog>
          </v-col>
        </v-row>

        <draggable v-model="listItems" direction="vertical" @start="drag=true" @end="drag=false">
          <v-expansion-panels class="mb-3" popout v-for="(item,index) in listItems" :key="index">
            <ListItem @send="deleteItem" :editable="true" :item="item" :index="index"></ListItem>
          </v-expansion-panels>
        </draggable>

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
            <span>Total: ${{ total }} </span>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-fade-transition>

</template>

<script>
  import ListItem from "../components/ListItem";
  import ElementDetails from "../components/ElementDetails";
  import {sync} from "vuex-pathify";
  import draggable from 'vuedraggable';

  import {maxLength, minLength, required} from 'vuelidate/lib/validators'

  export default {
    name: "createList",

    components: {ListItem, ElementDetails, draggable},

    data() {
      return {
        errorMessage: "",
        loading: false,
        addElement: false
      }
    },

    created() {
      this.$store.commit("lists/resetList");
    },


    validations: {
      listName: {
        required, minLength: minLength(1), maxLength: maxLength(15)
      }
    },

    computed: {
      ...sync("lists/*"),
      nameError() {
        const errors = [];
        if (!this.$v.listName.$dirty) {
          return errors;
        }
        !this.$v.listName.minLength && errors.push('El nombre debe contener por lo menos un caracter');
        !this.$v.listName.maxLength && errors.push('El nombre debe contener como máximo 15 caracteres');
        !this.$v.listName.required && errors.push('El nombre es requerido');
        return errors;
      },
      total() {
        let sum = 0;
        return this.listItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },

    methods: {
      async createList() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          console.log("the form is missing something");
          return;
        }
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        try {
          this.loading = true;
          await sleep(1000);
          await this.$store.dispatch("lists/createList", {
            name: this.listName,
            items: this.listItems
          });
          this.errorMessage = "Lista creada exitosamente.";
          await sleep(2000);
          this.loading = false;
          this.errorMessage = "";
          await this.$router.replace("/home");
        } catch (e) {
          this.errorMessage = "Error al crear lista."
          await setTimeout(() => {
            this.errorMessage = "";
            this.loading = false;
          }, 2000);
          console.log(e);
        }
      },
      deleteItem(index) {
          this.$store.commit('lists/deleteFromList', {index:index});
      }
    }
  }
</script>

<style scoped>
.backgroundColor{
  background-color: #f0f2f5;
}
</style>
