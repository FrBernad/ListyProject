<template>
  <v-overlay :value="rOn" opacity="0.6">
    <v-container fluid fill-height>
      <v-row justify="center" align="center">
        <v-col cols="11" sm="8" md="5" lg="4">
          <v-card class="px-8 pb-8 pt-4 text-center" light>
            <v-row justify="space-between" align="center" class="px-3">
              <span class="text-h4 font-weight-medium black--text">Registrate</span>
              <v-icon @click="closeOverlay" small color="black">
                mdi-alpha-x-circle-outline
              </v-icon>
            </v-row>

            <v-divider class="mt-4 mb-2"/>

            <v-row align="center" justify="space-around">
              <!--ERROR-->
              <v-col cols="12" v-if="mailExists" class="pt-2 pb-0">
                <p class="red--text font-weight-medium">Ya existe una cuenta bajo ese email, intente con otro</p>
              </v-col>
              <!--NAME-->
              <v-col cols="12">
                <v-text-field
                  @blur="$v.username.$touch()"
                  :error-messages=usernameErrors
                  hide-details="auto"
                  label="Usuario"
                  v-model="username"
                  outlined
                ></v-text-field>
              </v-col>
              <!--EMAIL-->
              <v-col cols="12">
                <v-text-field
                  @blur="$v.email.$touch()"
                  :error-messages=emailErrors
                  hide-details="auto"
                  label="Correo electronico"
                  v-model="email"
                  outlined
                ></v-text-field>
              </v-col>
              <!--PASSWORD-->
              <v-col cols="12" class="pb-0">
                <v-text-field
                  @blur="$v.password.$touch()"
                  :error-messages=passwordErrors
                  hide-details="auto"
                  v-model="password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  label="Contraseña"
                  hint="Minimo 8 caracteres"
                  outlined
                  counter
                  @click:append="show = !show"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-0">
                <p class="text-center" style="font-size: 0.6rem">Al hacer clic en registrar, aceptas las Condiciones, la
                  Política de datos y la Política de cookies.</p>
              </v-col>
              <v-btn color="success" @click="processData" large width="80%">Registrar</v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
  import {required, maxLength, minLength, email} from 'vuelidate/lib/validators'

  export default {
    name: "RegisterOverlay",

    props: {
      rOn: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        username: "",
        email: "",
        password: '',
        mailExists: false,
        show: false,
      }
    },

    methods: {
      closeOverlay() {
        this.$emit('closeRegisterOverlay');
      },

      async processData() {
        if (this.$v.$invalid) {
          console.log("the form is missing something");
          return;
        }
        try {
          await this.$store.dispatch('auth/signUp', {
            email: this.email,
            password: this.password,
            username: this.username
          })
          await this.$router.replace('/home');
        } catch (e) {
          console.log(e);
          this.mailExists = true;
          setTimeout(this.resetForm, 4000);
        }
      },
      resetForm() {
        this.$v.$reset();
        this.username = "";
        this.email = "";
        this.password = "";
        this.mailExists = false;
      }
    },

    validations: {
      username: {
        required, maxLength: maxLength(10)
      },
      email: {
        required, email
      },
      password: {
        required, minLenght: minLength(8)
      }
    },

    computed: {
      usernameErrors() {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.maxLength && errors.push('Como maximo 10 caracteres.')
        !this.$v.username.required && errors.push('El usuario es obligatorio.')
        return errors
      }
      ,
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
</style>

