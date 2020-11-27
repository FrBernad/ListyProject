<template>
  <v-container class="backgroundColor" fluid style="height: 100%">
    <v-dialog v-model="groupDialog" persistent width="700px" class="justify-center align-center">
      <CreateGroupDialog @closeDialog="checkDialog"></CreateGroupDialog>
    </v-dialog>
    <transition name="fade">
      <v-row align="start" justify="center" style="height: 100%" v-if="!loading">
        <v-col cols="12">
          <v-row class="px-6 pt-4" :justify="this.groupEntries.length ? 'start': 'center'">
            <v-col cols="12" class="d-flex justify-center align-center" v-if="this.groupEntries.length">
              <v-btn color="primary" width="55%" @click="groupDialog=true">CREAR GRUPO</v-btn>
            </v-col>
            <v-col v-if="!this.groupEntries.length" cols="12" sm="8">
              <v-card :height="$vuetify.breakpoint.smAndDown ? '40vh' : '400px'"
                      class="d-flex justify-center align-center mt-5">
                <v-row justify="center" align="center">
                  <v-col cols="12">
                    <p class="my-md-3 my-0 px-6 px-md-13 text-center text-body-1 text-sm-h6 text-md-h4 grey--text">
                      Parece que no perteneces a ningún grupo. Crea un grupo o únete a uno mediante un link.</p>
                  </v-col>
                  <v-col cols="8" class="d-flex justify-center align-center mt-md-3">
                    <v-btn color="primary" width="90%" @click="groupDialog=true">CREAR GRUPO</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" lg="4" v-for="(entry,index) in groupEntries" :key="index">
              <GroupPreview :data="entry"/>
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
  import GroupPreview from '../components/GroupPreview'
  import CreateGroupDialog from '../components/CreateGroupDialog'

  export default {
    name: 'Grupos',
    components: {
      GroupPreview,
      CreateGroupDialog
    },

    data() {
      return {
        entries: [],
        groupEntries: [],
        page: 1,
        totalPages: 0,
        itemsPerPage: 6,
        pages: 0,
        groupDialog: false,
        loading: true
      }
    },

    created() {
      this.seedGroups()
    },

    methods: {
      checkDialog(refresh) {
        if (refresh) {
          this.loading = true;
          this.seedGroups();
        }
        this.groupDialog = false;
      },

      async seedGroups() {
        try {
          let groups = Object.entries(await this.$store.dispatch('lists/getGroups'));
          this.totalPages = groups.length;
          this.pages = Math.ceil((this.totalPages / this.itemsPerPage));
          this.entries = groups;
          this.groupEntries = this.entries.slice(this.page - 1, this.itemsPerPage);
        } catch (e) {
          console.log(e);
        }
        this.loading = false;
      },
      changePage() {
        this.favoriteEntries = this.entries.slice(this.page - 1, this.itemsPerPage)
      }
    }
  }
</script>

<style scoped>
  .backgroundColor {
    background-color: #f0f2f5;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>

