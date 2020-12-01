<template>
  <v-container class="fill-height backgroundColor" fluid>

    <v-row class="justify-center align-start">
      <v-col cols="12" class="align-center justify-center">
        <h1 class="text-center ">FAQs </h1>
      </v-col>
    </v-row>

    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">¿Qué es Listy?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Es una aplicación web cuyo objetivo es facilitarte el armado de tus listas de compras ya
          sea de forma individual o comunitaria.</p>
      </v-col>
    </v-row>

    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">¿Cómo puedo crear una Lista?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Es muy sencillo, ve a la sección de Mis Listas en la barra que se encuentra a la
          izquierda, presiona crear lista y comienza a agregar items y participantes.</p>
      </v-col>
    </v-row>

    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">¿Cómo funcionan las listas?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Las listas están formadas por items, donde cada uno tiene su precio y su responsable.
          Los precios de cada item se suman para obtener el valor total de la lista.</p>
      </v-col>
    </v-row>

    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">¿Las listas tienen un límite de participantes?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>No lo tiene, agrega a todas las personas con las que quieras compartir tus compras.</p>
      </v-col>
    </v-row>

    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">¿Las listas tienen una cantidad máxima de items?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Tampoco lo tiene, agrega todos los items que necesites.</p>
      </v-col>
    </v-row>

    <v-row class="align-center justify-center">
      <v-col cols="12" class="align-center justify-start">
        <h2 class="text-start">¿Puedo pagar a través de Listy?</h2>
      </v-col>
      <v-col cols="12" class="justify-start align-center">
        <p>Sí, podés pagar lo que le debes a tus compañeros a través de Mercado Pago.</p>
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
  .backgroundColor {
    background-color: #f0f2f5;
  }
</style>
