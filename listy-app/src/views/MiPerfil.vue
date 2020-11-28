<template>
  <v-container class="backgroundColor" fluid style="height:100%" tile>
    <v-row align="center" justify="center" style="height: 225px">
      <v-col cols="6" class="d-flex align-center justify-center" style="position: relative">
        <div class="d-flex" style="position: absolute">
          <v-avatar size="200px"
                    class="elevation-5">
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

      <!--avatar change dialog-->
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
            <v-col cols="12" md="8" class="d-flex justify-space-around align-center">
              <v-btn color="primary" outlined @click="cancelPicChange">
                CANCELAR
              </v-btn>
              <v-btn @click="changePic" color="primary">
                MODIFICAR
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>

    </v-row>

    <!--Mercado Pago Dialog-->
    <v-dialog v-model="mercadoPagoPopup" width="550">
      <v-card class="pa-6">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="newToken"
              label="Token de mercado pago"
              placeholder="Token de mercado pago"
              outlined
              clearable
              :error-messages="tokenError"
            ></v-text-field>
            <p class="text-center ma-0">¿No tienes tu token? <a target="_blank" href="https://www.mercadopago.com.ar/developers/es/guides/resources/faqs/credentials/">Obten tu token
              aqui</a></p>
          </v-col>
          <v-col cols="12" md="8" class="d-flex justify-space-around align-center">
            <v-btn color="primary" outlined @click="cancelMercadoPagoChange">
              CANCELAR
            </v-btn>
            <v-btn @click="changeToken" color="primary">
              MODIFICAR
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-row class="justify-center">

      <v-col cols="11" md="9">

        <v-card ref="form" class="mt-10">

          <v-card-text class="pb-0">

            <v-text-field
              ref="username"
              v-model="username"
              label="Usuario"
              readonly
              hide-details
              class="mb-5"
            ></v-text-field>

            <v-text-field
              class="mb-2"
              ref="email"
              v-model="email"
              label="E-mail"
              readonly
              hide-details
            ></v-text-field>

          </v-card-text>

          <v-list
            class="pt-0"
          >
            <v-list-item
            >

              <v-list-item-avatar>
                <v-img
                  src="../assets/images/mercadoPago.png"
                  alt="Mercado Pago logo"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Mercado Pago</v-list-item-title>
                <v-list-item-subtitle v-if="!!mercadoPagoToken">
                  <span class="pr-2">Cuenta vinculada</span>
                  <v-icon small color="green">mdi-check</v-icon>
                </v-list-item-subtitle>
                <v-list-item-subtitle v-else>
                  <span class="pr-2">Cuenta no vinculada</span>
                  <v-icon small color="red">mdi-alpha-x-circle-outline</v-icon>
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="mercadoPagoPopup = true">
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

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
        picDialog: false,
        url: "",
        newToken: "",
        mercadoPagoPopup: false,
      }
    },

    methods: {

      cancelPicChange() {
        this.url = "";
        this.picDialog = false;
        this.$v.$reset();
      },

      async changePic() {
        this.$v.url.$touch();
        if (this.$v.url.$invalid) {
          this.$v.url.$touch();
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

      cancelMercadoPagoChange() {
        this.newToken = "";
        this.mercadoPagoPopup = false;
        this.$v.$reset();
      },

      async changeToken() {
        this.$v.newToken.$touch();
        if (this.$v.newToken.$invalid) {
          this.$v.newToken.$touch();
          console.log("the form is missing something");
          return;
        }
        try {
          await this.$store.dispatch("user/changeMercadoPagoToken", {token: this.newToken});
        } catch (e) {
          console.log(e)
        }
        this.cancelMercadoPagoChange();
      },
    },

    validations: {
      url: {required, minLength: minLength(4)},
      newToken: {required, minLength: minLength(4)}
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
      },

      tokenError() {
        const errors = [];
        if (!this.$v.newToken.$dirty) {
          return errors;
        }
        !this.$v.newToken.minLength && errors.push(`Token must be at least 4 characters long`);
        !this.$v.newToken.required && errors.push('Token is required');
        return errors;
      },
      ...sync("user/*")
    }
  }
</script>

<style scoped>
  .backgroundColor {
    background-color: #f0f2f5;
  }
</style>
