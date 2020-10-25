<template>
  <v-container fluid fill-height>
    <v-row>
        <v-card class="pa-1 " elevation="10">
          <v-card-title class="text-h2"> FAQS</v-card-title>

          <v-list>
           <v-list-item>

            <v-list-item-content class="">
              <v-list-item-title>Que es Listy?</v-list-item-title>
              <v-list-item-subtitle>Es una aplicacion web cuyo objetivo es facilitarte el armado de la lista de compras ya sea de forma individual o comunitaria</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Como puedo crear una Lista?</v-list-item-title>
              <v-list-item-subtitle>Es muy sensillo, ve a la seccion de Mis Listas en la barra que se encuentra a la izquiera,  presiona crear lista y comienza a agregar items y participantes
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title>Como funcionan las listas?</v-list-item-title>
                <v-list-item-subtitle>Las listas estan formadas por items, donde cada uno tiene su precio y su responsable. Los precios de cada item se suman para tener el valor total de la lista
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          <v-list-item four-line>
            <v-list-item-content>
              <v-list-item-title>Las listas tienen un limite de participantes?</v-list-item-title>
              <v-list-item-subtitle>No lo tiene, agrega a todas las personas con las que quieras compartir tus compras
              </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item five-line>
              <v-list-item-content>
                <v-list-item-title>Las listas tienen una cantidad maxima de items? </v-list-item-title>
                <v-list-item-subtitle>Tampoco lo tiene , agrega todos los items que necesites
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item five-line>
              <v-list-item-content>
                <v-list-item-title>Puedo pagar a traves de Listy?</v-list-item-title>
                <v-list-item-subtitle>Si, podes pagar lo que le debes a tus compañeros a través de Mercado Pago
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card>
      </v-row>
    </v-container>
</template>
<script>
export default {
name: "Ayuda"
}
</script>

<style scoped>

</style>
