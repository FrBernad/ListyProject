<template>
  <v-container class="fill-height backgroundColor" fluid>
    <v-row class="justify-center align-start">
      <v-col cols="12" class="align-center justify-center">
        <h1 class="text-center ">FAQs </h1>
      </v-col>
    </v-row>


    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">Que es Listy? </h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Es una aplicacion web cuyo objetivo es facilitarte el armado de la lista de compras ya
          sea de forma individual o comunitaria</p>
      </v-col>
    </v-row>


    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">Como puedo crear una Lista? </h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Es muy sensillo, ve a la seccion de Mis Listas en la barra que se encuentra a la
          izquiera, presiona crear lista y comienza a agregar items y participantes</p>
      </v-col>
    </v-row>


    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">Como funcionan las listas? </h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Las listas estan formadas por items, donde cada uno tiene su precio y su responsable.
          Los precios de cada item se suman para tener el valor total de la lista</p>
      </v-col>
    </v-row>


    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">Las listas tienen un limite de participantes?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>No lo tiene, agrega a todas las personas con las que quieras compartir tus compras</p>
      </v-col>
    </v-row>


    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">Las listas tienen una cantidad maxima de items? </h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Tampoco lo tiene , agrega todos los items que necesites</p>
      </v-col>
    </v-row>


    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">Puedo pagar a traves de Listy? </h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Si, podes pagar lo que le debes a tus compañeros a través de Mercado Pago</p>
      </v-col>
    </v-row>


  </v-container>

</template>
<script>
export default {
  name: "Ayuda"
}
</script>

<style scoped>
.backgroundColor{
  background-color: #f0f2f5;
}
</style>
