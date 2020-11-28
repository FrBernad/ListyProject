<template>
  <v-container class="fill-height pt-0 pt-sm-3">
    <v-row justify="center" align="center">
      <v-col cols="11" sm="8">
             <v-card class="pa-8 text-center">
          <v-form>
            <!--ERROR-->
            <v-col cols="12" v-if="signInError" class="pt-2 pb-0">
              <p class="red--text font-weight-medium">Ingrese datos correctos</p>
            </v-col>
            <!--EMAIL-->
            <v-text-field
              id="loginEmail"
              @blur="$v.email.$touch()"
              :error-messages=emailErrors
              label="Correo electrónico"
              outlined
              append-icon="mdi-account"
              v-model="email"
            ></v-text-field>
            <!--PASSWORD-->
            <v-text-field
              id="loginPassword"
              @blur="$v.password.$touch()"
              :error-messages=passwordErrors
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="Minimo 8 caracteres"
              outlined
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="primary" @click="processData" large width="90%">Entrar</v-btn>
          </v-form>

          <v-divider class="mt-4 mb-6"/>

          <v-btn color="success" large width="70%" @click="registerOverlay=true">Registrarse</v-btn>

          <RegisterOverlay :r-on="registerOverlay" @closeRegisterOverlay="registerOverlay=false"></RegisterOverlay>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'

  import RegisterOverlay from "./RegisterOverlay";

  export default {
    name: 'Login',
    components: {RegisterOverlay},
    data() {
      return {
        email: "",
        password: "",
        show: false,
        registerOverlay: false,
        signInError: false
      }
    },
    methods: {
      async processData() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          console.log("the form is missing something");
          return;
        }
        try {
          await this.$store.dispatch('signIn', {
            email: this.email,
            password: this.password
          })

          await this.$router.replace('/home');
        } catch (e) {
          if (e === 400) {
            await this.$store.dispatch("verifyEmail");
            await this.$router.replace('/verifyAccount');
          }
          console.log(e);
          this.signInError = true;
          setTimeout(this.resetForm, 4000);
          return;
        }
      },
      resetForm() {
        this.$v.$reset();
        this.email = "";
        this.password = "";
        this.signInError = false;
      }
    },

    validations: {
      email: {
        required, email
      },
      password: {
        required, minLenght: minLength(8)
      }
    },

    computed: {
      passwordErrors() {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLenght && errors.push('Minimo 8 caracteres.')
        !this.$v.password.required && errors.push('La contraseña es obligatoria.')
        return errors
      }
      ,
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Inserte un email valido.')
        !this.$v.email.required && errors.push('El e-mail es requerido.')
        return errors
      }
      ,
    }
    ,
  }
</script>

<style scoped>
  #forgot {
    color: #1D50AE;
  }
</style>
