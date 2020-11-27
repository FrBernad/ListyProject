<template>
  <v-container v-if="ready" fluid class="backgroundColor" style="height:100%">

    <!--create list dialog-->
    <v-dialog v-model="listDialog" persistent width="700px" class="justify-center align-center">
      <CreateListGroupDialog @closeDialog="close"></CreateListGroupDialog>
    </v-dialog>

    <!--share group dialog-->
    <v-dialog v-model="shareDialog" width="500px">
      <v-container class="backgroundDialog elevation-8">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h1 class="text-center text-h6 text-sm-h4">Copia el link y compartelo con tus amigos</h1>
          </v-col>
        </v-row>
        <v-row class="align-center justify-center">
          <v-col cols="10" md="8" class="d-flex align-center justify-space-around">
            <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" outlined @click="shareDialog = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" @click="copyToClipboard">Copiar link</v-btn>
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
          <v-btn @click="edit = !edit" :disabled="edit" icon color="#000000">
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

      <v-row>
        <v-col md="4" cols="6" v-for="(member, index) of this.membersName" :key="index">
          <GroupUser :user-data="member"></GroupUser>
        </v-col>
      </v-row>

    </v-card>

    <v-card class="px-5" elevation="10" outlined>
      <v-row align="center" justify="center">
        <v-col cols="6" sm="3" md="2" class="d-flex justify-center justify-small-start align-center">
          <transition name="fade">
            <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" outlined @click="cancelModify" v-if="edit">
              CANCELAR
            </v-btn>
          </transition>
        </v-col>
        <v-col cols="6" sm="3" md="2" class="d-flex justify-sm-start justify-center align-center">
          <transition name="fade">
            <v-btn color="primary" :small="this.$vuetify.breakpoint.xsOnly" @click="modifyGroup" v-if="edit">
              MODIFICAR
            </v-btn>
          </transition>
        </v-col>
        <v-col cols="6" md="8" class="d-flex justify-center justify-sm-end align-center">
          <v-btn class="white--text" :small="this.$vuetify.breakpoint.xsOnly" color="primary"
                 @click="listDialog = true">
            <v-icon left color="white">mdi-cart</v-icon>
            CREATE LIST
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

  </v-container>

</template>

<script>
  import CreateListGroupDialog from '../components/CreateListGroupDialog'
  import GroupUser from '../components/GroupUser'
  import {sync} from "vuex-pathify";
  import {maxLength, minLength, required} from 'vuelidate/lib/validators';


  export default {
    name: "Group",
    props: ["groupId", "share"],
    components: {
      CreateListGroupDialog,
      GroupUser
    },

    data() {
      return {
        errorMessage: "",
        ready: false,
        loading: false,
        edit: false,
        listDialog: false,
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
      async cancelModify() {
        await this.seedGroup();
        this.edit = false;
      },

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
          let aux = await this.$store.dispatch("lists/getGroupMembersInfo", {members: this.members});
          this.$store.commit("lists/setGroupMembersData", {members: aux});
        } catch (e) {
          console.log(e)
        }
        this.ready = true;
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
        } catch (e) {
          console.log(e)
        }
        this.edit = false;
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

  .backgroundDialog {
    background-color: #FFFFFF;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }


</style>
