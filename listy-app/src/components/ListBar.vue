<template>
  <v-card class="pa-1 v-flex" elevation="10">
    <v-row class="align-center  v-flex">
      <v-col cols="5" sm="6" class="align-left v-flex">
        <v-card-title>{{ title }}</v-card-title>
      </v-col>
      <v-spacer></v-spacer>

      <v-col cols="1" class="d-flex align-center v-flex">
        <v-menu
          top
          right
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="black">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-card>

</template>

<script>
export default {
  name: "ListBar",
  props: {
    title: {
      type: String,
      default: 'Nueva Lista'
    }
  },
  data (){
    return {
      items: [
        { title: 'Renombrar' },
        { title: 'Compartir' },
        { title: 'Borrar' },
      ],
    }
  }
}
</script>

<style scoped>

</style>
