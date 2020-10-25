<template>
  <v-card class="pa-3">
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-card-text class="ma-0 py-0">Name:</v-card-text>
        <v-autocomplete class="px-4 ma-0 py-0" v-model="model"
                        :items="items"
                        :loading="isLoading"
                        :search-input.sync="search"
                        color="white"
                        hide-no-data
                        hide-selected
                        item-text="Description"
                        item-value="API"
                        placeholder="Start typing to Search"
                        prepend-icon="mdi-database-search"
                        return-object></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex ma-0 pa-0 justify-start">
        <v-text-field background-color="#ffffff" dense hide-details solo label="Cantidad"
                      clearable class="px-4 ma-0"></v-text-field>
      </v-col>
      <v-col cols="8" class="d-flex ma-0 pa-0 justify-end">
        <v-text-field background-color="#ffffff" dense hide-details solo label="Responsable"
                      clearable class="px-4 ma-0"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-text-field background-color="#ffffff" dense hide-details solo label="Aclaración"
                      clearable class="px-1 ma-0"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex ma-0 pa-0 justify-start">
        <v-card-text class="px-4">Precio:</v-card-text>
      </v-col>
    </v-row>
    <v-card-actions class="justify-end">
      <v-btn
        color="#212529"
        outlined
        @click="elementClose"
      >
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ElementDetails",
  methods: {
    elementClose() {
      this.$emit('elementClose');
    }
  }
}
</script>

<style scoped>

</style>
