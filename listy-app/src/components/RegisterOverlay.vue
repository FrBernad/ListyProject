<template>
  <v-overlay :value="rOn" opacity="0.6">
    <v-container fluid fill-height>
      <v-row justify="center" align="center">
        <v-col cols="11" sm="8" md="5" lg="4">
          <v-card class="px-8 pb-8 pt-4 text-center" color="#212529">
            <v-row justify="space-between" align="center">
              <span class="text-h4 font-weight-medium">Registrate</span>
              <v-icon @click="closeOverlay" small color="#B9BABB">
                mdi-alpha-x-circle-outline
              </v-icon>
            </v-row>

            <v-divider class="mt-4 mb-6"/>

            <v-row align="center" justify="space-around">
              <v-col cols="6">
                <v-text-field
                  hide-details="auto"
                  label="Nombre"
                  v-model="name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  hide-details="auto"
                  label="Apellidos"
                  v-model="sirname"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  hide-details="auto"
                  label="Correo electronico"
                  v-model="email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
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
              <v-btn color="primary" :to="{name : 'UserHome'}" large width="80%">Registrar</v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
  import {required, maxLength, email} from 'vuelidate/lib/validators'

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
        name: "",
        sirname: "",
        email: "",
        show: false,
        password: '',
      }
    },

    methods: {
      closeOverlay() {
        this.$emit('closeRegisterOverlay');
      }
    },

    validations: {
      name: {required, maxLength: maxLength(10)},
      sirname: {required, maxLength: maxLength(10)},
      email: {required, email},
    },

    computed: {
      nameErrors() {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Inserte un email valido')
        !this.$v.email.required && errors.push('Un e-mail es requerido')
        return errors
      },
    },

  }
</script>

<style scoped>
  #forgot {
    color: #1D50AE;
  }
</style>

