<template>

  <v-card class="pa-5 fill-height" elevation="10" outlined>
    <v-row class="align-center  justify-center">
      <v-col cols="12" sm="8" class="d-flex align-center justify-center">
        <h1>{{ title }}</h1>
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

    <v-row class="align-center  justify-center">
      <v-col cols="12" class="pb-1">
        <v-btn color="rgba(227,237,247,1)" block>
          <v-icon color="#69A74E" size="x-large">mdi-plus-circle</v-icon>
          <span class="font-weight-bold ">Agregar elemento</span>
        </v-btn>
      </v-col>
    </v-row>


    <v-row class="align-center  justify-center">

      <v-expansion-panels popout>
        <ListItem :itemName="itemName" :quantity="quantity" :price="price" responsible="responsible" description="description"></ListItem>
        <ListItem :itemName="itemName" :quantity="quantity" :price="price" responsible="responsible" description="description"></ListItem>
        <ListItem :itemName="itemName" :quantity="quantity" :price="price" responsible="responsible" description="description"></ListItem>

      </v-expansion-panels>

    </v-row>


  </v-card>

</template>

<script>
import ListItem from "@/components/ListItem";

export default {
  name: "List",
  props: {
    title:{
      type:String,
      default:'Titulo'
    },
    category:{
      type:String,
      default:'Categoria'
    }
  },
  components: {ListItem},
  data(){
    return{
      itemName: 'Fernet Branca',
      quantity: '0',
      price:'0',
      responsible: 'Frano',
      description: 'Fernet para la previa'
    }
  }

}
</script>

<style scoped>

</style>
