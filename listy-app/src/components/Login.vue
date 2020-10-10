<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="10" sm="8">
        <v-card class="pa-8 text-center">
          <v-form>
            <v-text-field
              label="Usuario"
              outlined
              append-icon="mdi-account"
              v-model="user"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="Minimo 8 caracteres"
              outlined
              counter
              @click:append="show = !show"
            ></v-text-field>
            <v-btn color="primary" @click="signIn" large width="90%">Entrar</v-btn>
          </v-form>

          <div class="mt-3">
            <v-hover
              v-slot:default="{ hover }"
            >
              <a id="forgot" :class="{'text-decoration-underline':hover}" class="text-center">¿olvidaste tu usuario o
                contraseña?</a>
            </v-hover>
          </div>
          <v-divider class="mt-4 mb-6"/>
          <v-btn color="success" large width="70%" @click="registerOverlay=true">Registrarse</v-btn>
          <RegisterOverlay :r-on="registerOverlay" @closeRegisterOverlay="registerOverlay=false"></RegisterOverlay>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import RegisterOverlay from "./RegisterOverlay";
  export default {
    name: 'Login',
    components: {RegisterOverlay},
    data() {
      return {
        show: false,
        user: "",
        password: 'Contraseña',
        rules: {
          min: v => v.length >= 8 || 'Minimo 8 caracteres',
        },
        registerOverlay: false
      }
    },
    methods: {
      async signIn() {
        let userData = {
          name: this.user,
          password: this.password
        }
        try {
          const response = await fetch(
            `https://listy-itba-app.firebaseio.com/users.json`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(userData)
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>
  #forgot {
    color: #1D50AE;
  }
</style>
