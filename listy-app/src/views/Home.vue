<template>
  <v-container fluid style="height: 100%" class="backgroundColor">
    <transition name="fade">
      <v-row align="start" justify="center" style="height: 100%" v-if="!loading">
        <v-col cols="12">
          <v-row class="px-6 pt-4" :justify="this.currentEntries.length ? 'start': 'center'">
            <v-col cols="12" class="d-flex justify-center align-center" v-if="this.currentEntries.length">
              <v-btn color="primary" width="50%" to="/home/createList">CREAR LISTA</v-btn>
            </v-col>
            <v-col v-if="!this.currentEntries.length" cols="12" sm="8">
              <v-card :height="$vuetify.breakpoint.smAndDown ? '40vh' : '400px'"
                      class="d-flex justify-center align-center mt-5">
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <p class="my-md-3 my-0 px-6 px-md-13 text-center text-body-1 text-sm-h6 text-md-h4 grey--text">
                      Parece que no has creado ninguna lista, clickea en
                      <strong>CREAR LISTA</strong> para crear una.</p>
                  </v-col>
                  <v-col cols="8" class="d-flex justify-center align-center mt-md-3">
                    <v-btn id="createList" color="primary" width="80%" to="/home/createList">CREAR LISTA</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="4" v-for="(entry,index) in currentEntries" :key="index">
              <ListPreview :data="entry"/>
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
    </transition>
    <transition name="fade">
      <v-row v-if="loading" class="fill-height">
        <v-col cols="12" class="d-flex align-center justify-center">
          <v-progress-circular
            indeterminate
            size="60"
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
  import ListPreview from "../components/ListPreview";

  export default {
    name: "Home",

    components: {ListPreview},

    data() {
      return {
        entries: [],
        currentEntries: [],
        page: 1,
        totalPages: 0,
        itemsPerPage: 6,
        pages: 0,
        loading: true
      }
    },

    created() {
      this.seedEntries();
    },

    methods: {
      async seedEntries() {
        try {
          let lists = Object.entries(await this.$store.dispatch('lists/getLists'));
          this.totalPages = lists.length;
          this.pages = Math.ceil((this.totalPages / this.itemsPerPage));
          this.entries = lists;
          this.currentEntries = this.entries.slice(this.page - 1, this.itemsPerPage)
        } catch (e) {
          console.log(e);
        }
        this.loading = false;
      },
      changePage() {
        this.currentEntries = this.entries.slice(this.page - 1, this.itemsPerPage);
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .backgroundColor{
    background-color: #f0f2f5;
  }
</style>
