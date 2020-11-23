<template>
  <v-container fluid style="height: 100%">
    <v-row align="start" justify="center" style="height: 100%">
      <v-col cols="12">
        <v-row class="px-8 pt-4" :justify="this.favoriteEntries.length ? 'start': 'center'">
         <v-col v-if="!this.favoriteEntries.length" cols="10" sm="8">
            <v-card :height="$vuetify.breakpoint.smAndDown ? '40vh' : '400px'" class="d-flex justify-center align-center mt-5">
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <p class="my-md-3 my-0 px-6 px-md-13 text-center text-body-1 text-sm-h6 text-md-h4 grey--text">
                    Parece que no has destacado ninguna lista. Marca como favorita las listas mas frecuentes para hallarlas más rápido</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" lg="4" v-for="(entry,index) in favoriteEntries" :key="index">
            <FavoritePreview :data="entry"/>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center align-self-end">
        <v-container class="max-width">
          <v-pagination
            v-model="page"
            class="my-4"
            :length="pages"
            total-visible="5"
            @input="changePage"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import FavoritePreview from '../components/FavoritePreview'

export default {
  name: "Destacadas",

  components: {FavoritePreview},

  data() {
    return {
      entries: [],
      favoriteEntries: [],
      page: 1,
      totalPages: 0,
      itemsPerPage: 6,
      pages: 0,
    }
  },

  created() {
    this.seedEntries();
  },

  methods: {
    async seedEntries() {
      try {
        let lists = Object.entries(await this.$store.dispatch('lists/getFavourites'));
        this.totalPages = lists.length;
        this.pages = Math.ceil((this.totalPages / this.itemsPerPage));
        this.entries = lists;
        this.favoriteEntries = this.entries.slice(this.page - 1, this.itemsPerPage)
      } catch (e) {
        console.log(e);
      }
    },
    changePage() {
      this.favoriteEntries = this.entries.slice(this.page - 1, this.itemsPerPage);
    }
  }
}
</script>

<style scoped>

</style>
