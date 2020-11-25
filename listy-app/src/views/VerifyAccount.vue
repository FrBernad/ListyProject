<template>
  <v-fade-transition appear>

    <v-container class="backgroundColor" fluid fill-height>
      <v-dialog
        v-model="loading"
        width="500px"
      >
        <v-card light color="#F8F9FA" width="500px" height="250px">
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-fade-transition>
                <v-col v-if="!errorMessage" cols="5" class="d-flex align-center justify-center">
                  <v-progress-circular
                    :size="70"
                    :width="7"
                    color="purple"
                    indeterminate
                  ></v-progress-circular>
                </v-col>
              </v-fade-transition>
              <v-fade-transition>
                <v-col cols="8" v-if="errorMessage" class="mt-8">
                  <h2 class="text-h5 text-center light-green--text">{{errorMessage}}</h2>
                </v-col>
              </v-fade-transition>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

      <v-row align="center" justify="center">
        <v-col cols="10" sm="10" md="7" lg="6">
          <v-card light color="#F8F9FA" class="pa-4">
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <h1 class="text-center text-h5 text-sm-h4 text-md-h3 font-weight-bold">Ya casi estamos!</h1>
                </v-col>
                <v-col cols="12">
                  <p class="text-center text-body-2 text-sm-h6 text-md-h5 font-weight-medium">
                    Verifica tu casilla de email y presiona en el link de confirmación.
                  </p>
                </v-col>
                <v-col cols="6" class="d-flex align-center justify-center pt-0">
                  <v-btn light outlined large width="50%" @click="redirect">LISTO</v-btn>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-divider class="mb-5"></v-divider>
                  <v-row justify="space-around" align="center">
                    <v-col cols="6">
                      <p class="text-start text-subtitle-2 mb-0 text-sm-subtitle-1">No resibiste nuestro email?</p>
                    </v-col>
                    <v-col cols="5" class="d-flex align-center justify-center">
                      <v-btn light outlined width="80%" @click="resendVerification">REENVIAR</v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-fade-transition>
</template>

<script>
  export default {
    name: "VerifyAccount",
    data() {
      return {
        code: "",
        email: "",
        loading: false,
        errorMessage: "",
      }
    },
    methods: {
      async redirect() {
        await this.$router.replace("/");
      },
      async resendVerification() {
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        try {
          this.loading = true;
          await sleep(1000);
          await this.$store.dispatch('verifyEmail', {
            email: this.email
          });
          this.errorMessage = "Email reenviado exitosamente.";
          await sleep(2000);
          this.loading = false;
          this.errorMessage = "";
        } catch (e) {
          this.errorMessage = "Error reenviando email.";
          await setTimeout(() => {
            this.errorMessage = "";
            this.loading = false;
          }, 2000);
          console.log(e);
        }
      }
    }
    ,
  }
</script>

<style scoped>
.backgroundColor{
  background-color: #f0f2f5;
}
</style>
