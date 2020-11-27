<template>
  <transition name="fade">
    <v-container v-if="ready" class="backgroundColor" fluid style="height:100%">

      <!--Share dialog-->
      <v-dialog v-model="shareDialog" width="500px">
        <v-container class="backgroundDialog elevation-8">
          <v-row class="align-center justify-center">
            <v-col cols="12">
              <h1 class="text-center text-h6 text-sm-h4">Copia el link y compártelo con tus amigos</h1>
            </v-col>
          </v-row>
          <v-row class="align-center justify-center">
            <v-col cols="10" md="8" class="d-flex align-center justify-space-around">
              <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" outlined @click="shareDialog = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" @click="copyToClipboard">Copiar link
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>

      <v-card class="pa-5" height="90%" elevation="10" outlined>

        <!--LIST HEADER-->
        <v-row class="align-center justify-center">
          <v-col cols="12" sm="8" class="d-flex align-center justify-start">
            <v-text-field class="text-h4 font-weight-bold" @blur="$v.listName.$touch()" :error-messages="nameError"
                          :readonly="!edit" v-model="listName">{{ listName }}
            </v-text-field>
          </v-col>

          <v-col cols="12" sm="4" class="d-flex align-center justify-space-around">
            <v-btn @click="edit = !edit" :disabled="edit" icon color="#000000">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="#000000" @click="shareList">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn icon color="#000000" @click="toogleFav">
              <v-icon v-if="fav">mdi-heart</v-icon>
              <v-icon v-else>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn icon color="#000000">
              <v-icon>mdi-credit-card-outline</v-icon>
            </v-btn>
            <v-btn icon color="#000000" @click="deleteList">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <transition name="fade">
          <v-row v-if="edit" class="align-center justify-center">
            <v-col cols="12">
              <v-dialog v-model="addElement" max-width="600px">
                <template v-slot:activator="{on, attrs}">
                  <v-btn color="#1976d2" block v-bind="attrs" v-on="on">
                    <v-icon class="mr-4" color="#69A74E" size="x-large">mdi-plus-circle</v-icon>
                    <span class="font-weight-bold white--text">Agregar elemento</span>
                  </v-btn>
                </template>
                <ElementDetails @elementClose="addElement=false"></ElementDetails>
              </v-dialog>
            </v-col>
          </v-row>
        </transition>

        <!--LIST ELEMENTS-->
        <draggable :disabled="!edit" v-model="listItems" direction="vertical" @start="drag=true" @end="drag=false">
          <v-expansion-panels class="mb-3" popout v-for="(item,index) in listItems" :key="index">
            <ListItem :editable="edit" :listId="listId" :item="item" :index="index" @send="deleteItem"></ListItem>
          </v-expansion-panels>
        </draggable>

      </v-card>

      <v-card class="px-5 " elevation="10" outlined>
        <v-row align="center" justify="center" style="height: 100%">
          <v-col cols="6" sm="3" md="2" class="d-flex justify-sm-start justify-center align-center">
            <transition name="fade">
              <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" outlined @click="cancelModify"
                     v-if="edit">
                CANCELAR
              </v-btn>
            </transition>
          </v-col>
          <v-col cols="6" sm="3" md="2" class="d-flex justify-sm-start justify-center align-center">
            <transition name="fade">
              <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" @click="modifyList" v-if="edit">
                MODIFICAR
              </v-btn>
            </transition>
          </v-col>
          <v-col cols="12" md="8" class="d-flex justify-center justify-sm-end align-center">
            <span>Total: ${{ total.toFixed(2) }}</span>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </transition>

</template>

<script>
  import ListItem from '../components/ListItem'
  import {sync} from 'vuex-pathify'
  import ElementDetails from '../components/ElementDetails'
  import draggable from 'vuedraggable'
  import {maxLength, minLength, required} from 'vuelidate/lib/validators'

  export default {
    name: 'EditList',

    props: ['listId', 'share'],

    components: {
      ListItem,
      ElementDetails,
      draggable
    },

    data() {
      return {
        errorMessage: '',
        loading: false,
        edit: false,
        addElement: false,
        fav: false,
        shareDialog: false,
        ready: false
      }
    },

    created() {
      this.$store.commit('lists/resetList')
      this.checkFav()
      this.seedList()
    },

    validations: {
      listName: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(15)
      }
    },

    computed: {
      ...sync('lists/*'),

      nameError() {
        const errors = []
        if (!this.$v.listName.$dirty) {
          return errors
        }
        !this.$v.listName.minLength && errors.push('El nombre debe contener por lo menos un caracter')
        !this.$v.listName.maxLength && errors.push('El nombre debe contener como máximo 15 caracteres')
        !this.$v.listName.required && errors.push('El nombre es requerido')
        return errors
      },
      total() {
        let sum = 0
        return this.listItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      listLink() {
        return this.$store.getters['hostUrl'] + this.$router.currentRoute.fullPath
      },

    },

    methods: {

      shareList() {
        this.shareDialog = true
      },

      copyToClipboard() {
        navigator.clipboard.writeText(this.listLink + '&share=true')
        this.shareDialog = false
      },

      async checkFav() {
        try {
          this.fav = await this.$store.dispatch('lists/checkFav', {listId: this.listId})
        } catch (e) {
          console.log(e)
        }
      },

      async addList() {
        try {
          let listData = {
            listId: this.listId,
            name: this.$store.getters['lists/listName']
          }
          await this.$store.dispatch('lists/addList', listData)
        } catch (e) {
          console.log(e)
        }
      },

      async toogleFav() {
        if (this.fav) {
          try {
            await this.$store.dispatch('lists/unfavList', {
              listId: this.listId,
            })
            this.fav = false
          } catch (e) {
            this.fav = false
            console.log('error unfaving')
            console.log(e)
          }
        } else {
          try {
            await this.$store.dispatch('lists/favList', {
              listId: this.listId,
              name: this.$store.getters['lists/listName']
            })
            this.fav = true
          } catch (e) {
            this.fav = true
            console.log('error faving')
            console.log(e)
          }
        }
      },

      async seedList() {
        try {
          const listData = await this.$store.dispatch('lists/getList', {listId: this.listId})
          if (listData == null) {
            await this.$router.replace('PageNotFound')
            return
          }
          this.$store.commit('lists/setList', listData)
          if (this.share) {
            console.log('adding')
            await this.addList()
          }
        } catch (e) {
          console.log(e)
        }
        this.ready = true
      },

      async deleteList() {
        try {
          this.$swal.fire({
              didOpen: (popup) => {
                this.$swal.showLoading()
                this.$swal.clickConfirm()
              },
              padding: '6rem',
              showConfirmButton: false,
              preConfirm: async () => {
                try {
                  return await this.$store.dispatch('lists/deleteList', {listId: this.listId})
                } catch (e) {
                  return 0
                }
              },
              allowOutsideClick: () => !this.$swal.isLoading()
            }
          ).then((result) => {
              if (result.isConfirmed) {
                if (!result.value) {
                  this.$swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar la lista, intente denuevo.',
                  })
                } else {
                  this.$swal.fire({
                    icon: 'success',
                    title: 'Lista eliminada.',
                  }).then(async (result) =>
                    await this.$router.replace('/home')
                  )
                }
              }
            }
          )
        } catch (e) {
          console.log(e)
        }
      },

      async cancelModify() {
        await this.seedList()
        this.edit = false
      },

      async modifyList() {
        let items = this.$store.getters['lists/listItems']
        let list = {
          listId: this.listId,
          listName: this.listName,
          items: items
        }

        this.$swal.fire({
            didOpen: (popup) => {
              this.$swal.showLoading()
              this.$swal.clickConfirm()
            },
            padding: '6rem',
            showConfirmButton: false,
            preConfirm: async () => {
              try {
                return await this.$store.dispatch('lists/modifyList', list)
              } catch (e) {
                return 0
              }
            },
            allowOutsideClick: () => !this.$swal.isLoading()
          }
        ).then((result) => {
            if (result.isConfirmed) {
              if (!result.value) {
                this.$swal.fire({
                  icon: 'error',
                  title: 'Error al modificar la rutina, intente denuevo.',
                })
              } else {
                this.$swal.fire({
                  icon: 'success',
                  title: 'Lista modificada.',
                })
              }
            }
          }
        )
        this.edit = false
      },

      deleteItem(index) {
        this.$store.commit('lists/deleteFromList', {index: index})
      },

    }
  }
</script>

<style scoped>
  .backgroundDialog {
    background-color: #FFFFFF;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .backgroundColor {
    background-color: #FFFFFF;
  }
</style>
