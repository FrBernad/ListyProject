<template>
  <v-expansion-panel>

    <v-expansion-panel-header class="pt-0 pb-0 ">
      <v-row class="align-center  justify-center">
        <v-col cols="1">
          <v-checkbox color="#0099FF"></v-checkbox>
        </v-col>
        <v-col cols="7" class="text-start">
          <span>{{ item.name }}</span>
        </v-col>
        <v-col cols="2">
          <span>{{ item.quantity }}</span>
        </v-col>
        <v-col cols="2">
          <span>${{ item.price }}</span>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="6" class="justify-end">
          <v-card>
            <v-card-title>Aclaración</v-card-title>
            <v-card-text>{{ item.note }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6" class="justify-start">
          <v-card>
            <v-card-title>Responsable</v-card-title>
            <v-card-text>{{ item.responsible }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expansion-panel-content>

  </v-expansion-panel>

</template>

<script>
export default {
  name: "ListItem",
  props: {
    item: {
      type: Object,
    },
  },
}
</script>

<style scoped>

</style>
