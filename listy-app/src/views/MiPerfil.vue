<template>
  <v-container class="backgroundColor" fluid style="height:100%" tile>
    <v-col class="text-center">
      <v-avatar size="200" class="elevation-5">
        <v-img :src="pic"></v-img>
      </v-avatar>

      <v-row class="justify-center mt-3">
        <v-btn text
               color="primary"
               @click="changePicture">
          Cambiar foto
        </v-btn>
      </v-row>

      <v-row class="justify-center">
        <v-col cols="7">
          <v-card ref="form" class="mt-10">
            <v-card-text>
              <v-text-field
                ref="username"
                @blur="$v.username.$touch()"
                :error-messages=usernameErrors
                v-model="username"
                :counter="10"
                label="Usuario"
                placeholder='ingrese usuario'
              ></v-text-field>

              <v-text-field
                ref="email"
                @blur="$v.email.$touch()"
                :error-messages=emailErrors
                v-model="email"
                label="E-mail"
                placeholder='ingrese su email'
              ></v-text-field>

              <v-text-field
                placeholder="Seleccione la url de su foto"
                label="Cambiar foto"
                append-icon="mdi mdi-camera"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-btn color="primary" v-on:click="senddata" class="mt-6">
        <v-icon left>mdi-content-save</v-icon>
        Guardar
      </v-btn>
    </v-col>
  </v-container>
</template>

<script>
  import {email, maxLength} from "vuelidate/lib/validators";
  import {sync} from "vuex-pathify"

  export default {
    name: "MiPerfil",
    data() {
      return {
        pic: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg',
      }
    },
    created() {
      if (this.avatarUrl) {
        this.pic = this.avatarUrl
      }
    },
    methods: {
      senddata: function (event) {

      },
      getImage: function () {

      },
      changePicture: function () {
        this.pic = "https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
      },

    },

    validations: {
      username: {
        maxLength: maxLength(10)
      },
      email: {
        email
      },
    },

    computed: {
      usernameErrors() {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push('Como maximo 10 caracteres.')
        return errors
      }
      ,
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Inserte un email valido.')
        return errors
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
