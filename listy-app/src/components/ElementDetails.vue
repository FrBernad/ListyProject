<template>
  <v-card class="pa-5">
    <v-row class="justify-center align-center">
      <v-col cols="12">
        <v-text-field v-model="item.name"
                      label="Nombre"
                      placeholder="Comienza a escribir para buscar el producto"
                      prepend-icon="mdi-database-search"
                      :error-messages="nameError"
                      @blur="$v.item.name.$touch()">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-hover
          v-slot:default="{ hover }"
        >
        <a id="forgot" :class="{'text-decoration-underline':hover}" class="text-center" >¿No encontraste el producto que
          buscabas?</a>
        </v-hover>
      </v-col>
    </v-row>
    <v-row class="justify-center align-center">
      <v-col cols="4" class="pt-0">
        <v-text-field width="100%" background-color="#ffffff" dense hide-details
                      solo label="Cantidad"
                      clearable type="number" v-model.number="item.quantity"
                      :error-messages="quantityError"
                      @blur="$v.item.quantity.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="8" class="pt-0">
        <v-text-field background-color="#ffffff" dense
                      hide-details solo label="Responsable"
                      clearable width="100%" v-model="item.responsible"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-textarea
          outlined
          name="input-7-4"
          v-model="item.note"
          label="Aclaración"
          no-resize
          height="70px"
          :error-messages="noteError" @blur="$v.item.note.$touch()"
          clearable
          counter="100"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" class="d-flex py-0 justify-start">
        <v-text-field label="Precio" type="number" v-model.number="item.price" :error-messages="priceError"
                      @blur="$v.item.price.$touch()"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="align-center justify-end">
      <v-col cols="12" sm="8" md="6" class="d-flex align-center justify-space-around">
        <v-btn color="#212529" outlined @click="elementClose">Cerrar</v-btn>
        <v-btn color="#212529" outlined @click="addElement">Agregar</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {maxLength, minLength, required, minValue} from 'vuelidate/lib/validators'

export default {
  name: "ElementDetails",

  data() {
    return {
      item: {
        name: '',
        quantity: undefined,
        responsible: '',
        note: '',
        price: undefined
      },
    }
  },

  methods: {
    elementClose() {
      this.resetFields();
      this.$emit('elementClose');
    },
    addElement() {
      const copy = {
        name: this.item.name,
        quantity: this.item.quantity,
        responsible: this.item.responsible,
        note: this.item.note,
        price: this.item.price
      };
      console.log(copy);
      this.$store.commit('lists/addItem', copy);
      this.elementClose();
      this.resetFields();
    },
    resetFields() {
      this.item.name = '';
      this.item.quantity = undefined;
      this.item.responsible = '';
      this.item.note = '';
      this.item.price = undefined;
    }
  },

  validations: {
    item: {
      name: {
        required, minLength: minLength(1), maxLength: maxLength(50)
      },
      price: {
        minValue: minValue(0),
      },
      quantity: {required, minValue: minValue(1)},
      note: {
        maxLength: maxLength(100)
      }
    }
}
  ,
  computed: {
    nameError() {
      const errors = [];
      if (!this.$v.item.name.$dirty) {
        return errors;
      }
      !this.$v.item.name.minLength && errors.push('El nombre debe contener por lo menos un caracter');
      !this.$v.item.name.maxLength && errors.push('El nombre debe contener como máximo 50 caracteres');
      !this.$v.item.name.required && errors.push('El nombre es requerido');
      return errors;
    },

    quantityError() {
      const errors = [];
      if (!this.$v.item.quantity.$dirty) {
        return errors;
      }
      !this.$v.item.quantity.required && errors.push('La cantidad es requerida');
      !this.$v.item.quantity.maxLength && errors.push('La cantidad debe ser minimamente 1');
      return errors;
    },
    noteError() {
      const errors = [];
      if (!this.$v.item.note.$dirty) {
        return errors;
      }
      !this.$v.item.note.maxLength && errors.push('La nota debe ser como maximo de 100 caracteres');
      return errors;
    },

    priceError() {
      const errors = [];
      if (!this.$v.item.price.$dirty) {
        return errors;
      }
      !this.$v.item.price.minValue && errors.push('El precio debe ser mayor o igual que 0');
      return errors;
    },

  }
}

</script>

<style scoped>
#forgot {
  color: #1D50AE;
}
</style>
