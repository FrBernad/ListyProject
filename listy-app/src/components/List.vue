<template>
  <v-card class="pa-5 fill-height" elevation="10" outlined>
    <v-row class="align-center  justify-center">
      <v-col cols="12" sm="8" class="d-flex align-center justify-start">
        <h1>{{ this.title }}</h1>
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

    <v-row class="align-center justify-center">
      <v-col cols="12">
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{on, attrs}">
            <v-btn color="rgba(227,237,247,1)" block v-bind="attrs" v-on="on">
              <v-icon color="#69A74E" size="x-large">mdi-plus-circle</v-icon>
              <span class="font-weight-bold ">Agregar elemento</span>
            </v-btn>
          </template>
          <ElementDetails @elementClose="dialog=false"></ElementDetails>
        </v-dialog>
      </v-col>
    </v-row>


    <v-row class="align-center  justify-center">
      <v-expansion-panels popout v-for="item in listItems">
        <ListItem :item="item"></ListItem>
      </v-expansion-panels>
    </v-row>

  </v-card>
</template>

<script>
import ListItem from "@/components/ListItem";
import ElementDetails from "@/components/ElementDetails";
import {get} from "vuex-pathify";

export default {
  name: "List",
  props: {
    title:{
      type:String,
      default:'Titulo'
    },
  },
  components: {ListItem, ElementDetails},
  data(){
    return{
     dialog: false
    }
  },
  computed:{
    ...get("lists/*")
  }

}
</script>

<style scoped>

</style>
