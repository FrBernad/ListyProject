<template>
  <v-container fluid class="backgroundColor" style="height:100%">
    <v-dialog v-model="listDialog" persistent width="700px" class="justify-center align-center">
      <CreateListGroupDialog @closeDialog="close"></CreateListGroupDialog>
    </v-dialog>
    <v-dialog v-model="shareDialog" width="500px">
      <v-container class="backgroundDialog elevation-8">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="text-center">Copia el link y compartelo con tus amigos</h1>
          </v-col>
          <v-col cols="12" class="d-flex align-center justify-space-around">
            <v-btn @click="shareDialog = false">Cancelar</v-btn>
            <v-btn @click="copyToClipboard">Copiar link</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
    <v-card class="pa-5" height="90%" elevation="10" outlined>
      <v-row class="align-center justify-center">
        <v-col cols="12" sm="8" class="d-flex align-center justify-start">
          <v-text-field class="text-h4 font-weight-bold" @blur="$v.groupName.$touch()" :error-messages="nameError"
                        :readonly="!edit"
                        v-model="groupName">{{ groupName }}
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex align-center justify-space-around">
          <v-btn @click="edit = !edit" icon color="#000000">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon color="#000000" @click="shareGroup">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
          <v-btn icon color="#000000" @click="deleteGroup">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-list dense>
          <v-list-item  v-for="(member, index) of this.membersName" :key="index">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="member"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-card>


    <v-card class="px-5 justify-center align-content-center" elevation="10" outlined height="10%">
      <v-row align="center" justify="center">
        <v-col cols="6" class="d-flex justify-start align-center">
          <v-btn @click="modifyGroup" v-if="edit">
            MODIFICAR
          </v-btn>
        </v-col>
        <v-col cols="6" class="d-flex justify-end align-center">
          <v-btn @click="listDialog = true">
            <v-icon left color="black">mdi-cart</v-icon>
            CREATE LIST
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

  </v-container>
</template>

<script>
  import CreateListGroupDialog from '../components/CreateListGroupDialog'
  import {sync} from "vuex-pathify";
  import {maxLength, minLength, required} from 'vuelidate/lib/validators';



  export default {
    name: "Group",
    props: ["groupId", "share"],
    components: {
      CreateListGroupDialog
    },

    data() {
      return {
        errorMessage: "",
        loading: false,
        edit: false,
        listDialog : false,
        shareDialog: false
      }
    },
    created() {
      this.$store.commit("lists/resetGroup");
      this.seedGroup();
    },
    validations: {
      groupName: {
        required, minLength: minLength(1), maxLength: maxLength(15)
      }
    },

    computed: {
      ...sync("lists/*"),
      nameError() {
        const errors = [];
        if (!this.$v.groupName.$dirty) {
          return errors;
        }
        !this.$v.groupName.minLength && errors.push('El nombre debe contener por lo menos un caracter');
        !this.$v.groupName.maxLength && errors.push('El nombre debe contener como máximo 15 caracteres');
        !this.$v.groupName.required && errors.push('El nombre es requerido');
        return errors;
      },
      groupLink() {
        return this.$store.getters['hostUrl'] + this.$router.currentRoute.fullPath;
      }
    },

    methods: {
      shareGroup() {
        this.shareDialog = true;
      },

      close() {
        this.listDialog = false;
      },

      copyToClipboard() {
        navigator.clipboard.writeText(this.groupLink + "&share=true");
        this.shareDialog = false;
      },

      async seedGroup() {
        try {
          if (this.share) {
            await this.addGroup();
          }
          const groupData = await this.$store.dispatch("lists/getGroup", {groupId: this.groupId});
          if (groupData == null) {
            await this.$router.replace("PageNotFound");
            return;
          }
          this.$store.commit("lists/setGroup", groupData);
          let aux = await this.$store.dispatch("lists/getNames", {members: this.members});
          this.$store.commit("lists/setNames", {members: aux});
        } catch (e) {
          console.log(e)
        }
      },

      async addGroup() {
        try {
          let groupData = {groupId: this.groupId, name: this.$store.getters["lists/groupName"]}
          await this.$store.dispatch("lists/addGroup", groupData);
        } catch (e) {
          console.log(e);
        }
      },

      async deleteGroup() {
        try {
          this.$swal.fire({
              didOpen: (popup) => {
                this.$swal.showLoading();
                this.$swal.clickConfirm();
              },
              padding: "6rem",
              showConfirmButton: false,
              preConfirm: async () => {
                try {
                  return await this.$store.dispatch("lists/deleteGroup", {groupId: this.groupId});
                } catch (e) {
                  console.log(e);
                  return 0;
                }
              },
              allowOutsideClick: () => !this.$swal.isLoading()
            }
          ).then((result) => {
              if (result.isConfirmed) {
                if (!result.value) {
                  this.$swal.fire({
                    icon: "error",
                    title: "Error al eliminar el grupo, intente denuevo.",
                  })
                } else {
                  this.$swal.fire({
                    icon: "success",
                    title: "Grupo eliminado.",
                  }).then(async (result) =>
                    await this.$router.replace("/home/grupos")
                  )
                }
              }
            }
          )
        } catch (e) {
          console.log(e)
        }
      },
      async modifyGroup() {
        try {
          let members = this.$store.getters["lists/members"];
          let group = {groupId: this.groupId, groupName: this.groupName, members: members};
          await this.$store.dispatch("lists/modifyGroup", group);
          this.edit = false;
        } catch (e) {
          console.log(e)
        }
      },
      deleteMember(index) {
        this.$store.commit('lists/deleteFromGroup', {index: index});
      },
    }
  }
</script>

<style scoped>
  .backgroundColor {
    background-color: #f0f2f5;
  }
</style>
