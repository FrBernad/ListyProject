<template>
  <v-card class="px-5 py-1 align-center justify-center borderCard" elevation="10" width=100%>
    <v-row class="align-center justify-center">
      <v-col cols="12">
        <v-text-field
          v-model="groupListName"
          label="* Nombre de la lista"
          prepend-icon="mdi-note-text-outline"
          :error-messages="nameError"
          @blur="$v.groupListName.$touch()"
          :counter="20"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="align-center justify-end">
      <v-col cols="12" sm="8" md="6" class="d-flex align-center justify-space-around">
        <v-btn color="primary" @click="closeDialog" width="40%" x-large>Cancelar</v-btn>
        <v-btn color="primary" @click="newListGroup" width="40%" x-large>Crear</v-btn>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>

import {sync} from "vuex-pathify";
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

export default {

  name: 'CreateListGroupDialog',
  data () {
    return {
      groupListName: '',
    }
  },

  methods: {
    closeDialog () {
      this.groupListName = '';
      this.$emit('closeDialog')
    },
    async newListGroup () {
      if(this.$v.$invalid){
        this.$v.$touch();
        return;
      }
      const copy = {name: this.groupListName, members: this.members}
      await this.$store.dispatch('lists/newListGroup',copy);
      this.closeDialog();
    },

  },

  validations: {
    groupListName: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(25)
    },
  },

  computed: {
    ...sync("lists/*"),
    nameError () {
      const errors = []
      if (!this.$v.groupListName.$dirty) {
        return errors
      }
      !this.$v.groupListName.required && errors.push('El nombre de la lista del grupo es requerido')
      !this.$v.groupListName.maxLength && errors.push('El nombre de la lista del grupo debe contener como máximo 15 caracteres')
      !this.$v.groupListName.minLength && errors.push('El nombre de la lista del grupo debe contener por lo menos un caracter')
      return errors
    },
  }
}
</script>

<style scoped>
.borderCard {
  border: solid #1D50AE;
}
</style>
