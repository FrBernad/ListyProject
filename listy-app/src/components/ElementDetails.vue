<template>
  <v-card class="pa-5">
    <v-row class="justify-center align-center">
      <v-col cols="12">
        <v-text-field v-if="find" v-model="item.name"
                      label="Escriba el nombre del producto"
                      solo
                      :error-messages="nameError"
                      @blur="$v.item.name.$touch()"
                      hide-details="auto">
        </v-text-field>
        <v-autocomplete
          v-if="!find"
          v-model="selected"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          :item-value="check"
          item-text="name"
          label="Busca algun producto..."
          solo
        >
          <template v-slot:no-data>
            <v-list-item>
              <v-list-item-title>
                Busca el producto que
                <strong>necesites</strong>
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>
                mdi-cart-arrow-down
              </v-icon>
              <span v-text="item.name"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.price"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-cart-arrow-down</v-icon>
            </v-list-item-action>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-hover
          v-slot:default="{ hover }"
        >
          <a @click="changeLookup" id="forgot" :class="{'text-decoration-underline':hover}" class="text-center">
            {{lookupText}}</a>
        </v-hover>
      </v-col>
    </v-row>
    <v-row class="justify-center align-center">
      <v-col cols="6" class="pt-0">
        <v-text-field width="100%" background-color="#ffffff" dense
                      solo label="Cantidad"
                      type="number" v-model.number="item.quantity"
                      :error-messages="quantityError"
                      @blur="$v.item.quantity.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pt-0">
        <v-text-field :readonly="!find" label="Precio" type="number" solo dense   v-model.number="item.price"
                      :error-messages="priceError"
                      @blur="$v.item.price.$touch()"></v-text-field>
      </v-col>

    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <v-textarea
          solo
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
      <v-col cols="12" class="pt-0">
        <v-text-field background-color="#ffffff" dense
                      hide-details solo label="Responsable"
                      clearable width="100%" v-model="item.responsible"></v-text-field>
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
        selected: null,
        isLoading: false,
        text: "¿No encontraste el producto que buscabas?",
        items: [],
        search: null,
        item: {
          name: '',
          quantity: 0,
          responsible: '',
          note: '',
          price: 0,
          checked: false
        },
        find: false,
      }
    },
    watch: {
      selected(val) {
        if (val) {
          this.item.price = val.price;
          this.item.name = val.name;
          this.item.quantity = 1;
        } else {
          this.item.price = 0;
          this.item.name = "";
          this.item.quantity = 0;
        }
      },
      search(val) {
        // Items have already been loaded
        if (this.items.length > 0) return
        this.isLoading = true
        // Lazily load input items
        fetch('https://listy-itba-app.firebaseio.com/products.json?auth=' +
          this.$store.getters['token'])
          .then(res => res.clone().json())
          .then(res => {
            this.items = Object.values(res)
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
    methods: {
      changeLookup() {
        if (!this.find) {
          this.find = true;
          this.text = "¿Deseas buscar el producto en nuestra base de datos?"
        } else {
          this.find = false;
          this.text = "¿No encontraste el producto que buscabas?"
        }
        this.resetFields();
      },

      check(val) {
        return val;
      },

      elementClose() {
        this.resetFields();
        this.selected=null;
        this.$emit('elementClose');
      }
      ,
      addElement() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          console.log("the form is missing something");
          return;
        }
        const copy = {
          name: this.item.name,
          quantity: this.item.quantity,
          responsible: this.item.responsible,
          note: this.item.note,
          price: this.item.price,
          checked: this.item.checked
        };
        this.$store.commit('lists/addItem', copy);
        this.elementClose();
        this.resetFields();
      }
      ,
      resetFields() {
        this.item.name = '';
        this.item.quantity = 0;
        this.item.responsible = '';
        this.item.note = '';
        this.item.price = 0;
        this.item.checked = false;
      }
    }
    ,

    validations: {
      item: {
        name: {
          required, minLength: minLength(1), maxLength: maxLength(50)
        },
        price: {
          minValue: minValue(0),
        }
        ,
        quantity: {
          required, minValue: minValue(1)
        },
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

      lookupText() {
        return this.text;
      },

      quantityError() {
        const errors = [];
        if (!this.$v.item.quantity.$dirty) {
          return errors;
        }
        !this.$v.item.quantity.required && errors.push('La cantidad es requerida');
        !this.$v.item.quantity.maxLength && errors.push('La cantidad debe ser minimamente 1');
        return errors;
      }
      ,
      noteError() {
        const errors = [];
        if (!this.$v.item.note.$dirty) {
          return errors;
        }
        !this.$v.item.note.maxLength && errors.push('La nota debe ser como maximo de 100 caracteres');
        return errors;
      }
      ,

      priceError() {
        const errors = [];
        if (!this.$v.item.price.$dirty) {
          return errors;
        }
        !this.$v.item.price.minValue && errors.push('El precio debe ser mayor o igual que 0');
        return errors;
      }
      ,

    }
  }

</script>

<style scoped>
  #forgot {
    color: #1D50AE;
  }
</style>
