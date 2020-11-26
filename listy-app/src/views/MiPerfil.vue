<template>
  <v-container class="backgroundColor" fluid style="height:100%" tile>
    <v-row align="center" justify="center" style="height: 225px">
      <v-col cols="6" class="d-flex align-center justify-center" style="position: relative">
        <div class="d-flex" style="position: absolute">
          <v-avatar size="200px"
                    class="avBorder elevation-5">
            <v-img alt="profile picture"
                   class="ma-0 pa-0"
                   :src="profilePic"
                   lazy-src="../assets/images/emptyUser.png"
            />
          </v-avatar>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="#f8f9fa"
            elevation="5"
            @click="picDialog=true"
            style="position:absolute; bottom:0;right:10px"
          >
            <v-icon color="#202121">mdi-camera</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-dialog v-model="picDialog" width="550">
        <v-card class="pa-6">
          <v-row align="center" justify="center">
            <v-col cols="12" md="8">
              <v-text-field
                v-model="url"
                label="URL"
                placeholder="URL"
                outlined
                clearable
                :error-messages="urlErrors"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="8" class="d-flex justify-space-between align-center">
              <v-btn @click="cancelPicChange" outlined color="#212529">
                <v-icon class="mr-2" left>mdi-cancel</v-icon>
                CANCELAR
              </v-btn>
              <v-btn @click="changePic" outlined color="#212529">
                <v-icon class="mr-2">mdi-content-save-outline</v-icon>
                MODIFICAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="7">
        <v-card ref="form" class="mt-10">
          <v-card-text>
            <v-text-field
              ref="username"
              v-model="username"
              label="Usuario"
              readonly
            ></v-text-field>

            <v-text-field
              ref="email"
              v-model="email"
              label="E-mail"
              readonly
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {required, minLength} from "vuelidate/lib/validators";
  import {sync} from "vuex-pathify"

  export default {
    name: "MiPerfil",
    data() {
      return {
        pic: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg',
        picDialog: false,
        url: "",
      }
    },

    created() {
      if (this.avatarUrl) {
        this.pic = this.avatarUrl
      }
    },

    methods: {
      cancelPicChange() {
        this.url = "";
        this.picDialog = false;
      },
      async changePic() {
        this.$v.url.$touch();
        if (this.$v.$invalid) {
          this.$v.$touch();
          console.log("the form is missing something");
          return;
        }
        try {
          await this.$store.dispatch("user/changeAvatarUrl", {url: this.url});
        } catch (e) {
          console.log(e)
        }
        this.cancelPicChange();
      },
    },

    validations: {
      url: {required, minLength: minLength(4)}
    },

    computed: {
      profilePic() {
        if (this.avatarUrl)
          return this.avatarUrl

        return require("../assets/images/emptyUser.png");
      },
      urlErrors() {
        const errors = [];
        if (!this.$v.url.$dirty) {
          return errors;
        }
        !this.$v.url.minLength && errors.push(`URL must be at least 4 characters long`);
        !this.$v.url.required && errors.push('URL is required');
        return errors;
      }
      ,
      ...sync("user/*")
    }
  }
</script>

<style scoped>
  .backgroundColor {
    background-color: #f0f2f5;
  }
</style>
