<template>
  <v-card class="px-5 py-1 align-center justify-center borderCard" elevation="10" width=100%>
    <v-row class="align-center justify-center">
      <v-col cols="12">
        <v-text-field
          id="groupName"
          v-model="groupName"
          label="* Nombre del grupo"
          prepend-icon="mdi-account-group"
          :error-messages="nameError"
          @blur="$v.groupName.$touch()"
          :counter="20"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="align-center justify-end">
      <v-col cols="12" sm="8" md="6" class="d-flex align-center justify-space-around">
        <v-btn color="primary" outlined @click="closeDialog(false)" width="40%">Cancelar</v-btn>
        <v-btn color="primary" @click="newGroup" width="40%" >Crear</v-btn>
      </v-col>
    </v-row>

  </v-card>
</template>

<script>
  import {maxLength, minLength, required} from 'vuelidate/lib/validators'

  export default {

    name: 'CreateGroupDialog',
    data() {
      return {
        groupName: '',
        loading: false
      }
    },
    methods: {
      closeDialog(refresh) {
        this.groupName = '';
        this.$emit('closeDialog', refresh)
      },
      async newGroup() {
        if (!this.loading) {
          this.loading = true;
          if (this.$v.$invalid) {
            this.$v.$touch();
            return;
          }
          const copy = {groupName: this.groupName}
          try {
            await this.$store.dispatch('lists/newGroup', copy);
          } catch (e) {
            console.log(e)
          }
          this.closeDialog(true);
          this.loading = false;
        }
      },

    },

    validations: {
      groupName: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(25)
      },
    },

    computed: {
      nameError() {
        const errors = []
        if (!this.$v.groupName.$dirty) {
          return errors
        }
        !this.$v.groupName.required && errors.push('El nombre del grupo es requerido')
        !this.$v.groupName.maxLength && errors.push('El nombre del grupo debe contener como máximo 25 caracteres')
        !this.$v.groupName.minLength && errors.push('El nombre del grupo debe contener por lo menos un caracter')
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
