<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="pt-0 pb-0 ">
      <v-row class="align-center justify-center">
        <v-col cols="2" md="1">
          <v-btn @click.stop="" v-if="editable" icon color="#000000" @click="sendDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-checkbox
            @click.stop=""
            v-show="!editable"
            @change="toogleCheckbox"
            v-model="item.checked"
          ></v-checkbox>
        </v-col>
        <v-col cols="10" md="7" class="text-start">
          <v-text-field v-model="item.name" :class="{done: item.checked}" :readonly="!editable">{{ item.name }}
          </v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field label="Cantidad" v-model="item.quantity" :readonly="!editable">{{ item.quantity }}
          </v-text-field>
        </v-col>
        <v-col cols="6" md="2">
          <v-text-field label="Precio" v-model="item.price" :readonly="!editable">{{ item.price }}</v-text-field>
        </v-col>
      </v-row>
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <v-row>
        <v-col cols="6" class="justify-end px-6">
          <v-text-field label="Aclaración" v-model="item.note" :readonly="!editable">
            {{ item.note }}
          </v-text-field>
        </v-col>
        <v-col cols="6" class="justify-start px-8">
          <v-text-field label="Responsable" v-model="item.responsible" :readonly="!editable">
            {{item.responsible}}
          </v-text-field>
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
      listId: {
        type: String,
      },
      editable: {
        type: Boolean,
      },
      index: {
        type: Number,
      }
    },
    methods: {
      toogleCheckbox(value) {
        try {
          this.item.checked = value;
          this.$store.dispatch("lists/toogleCheckbox", {
            item: this.item,
            itemId: this.item.id,
            listId: this.listId
          });
        } catch (e) {
          console.log(e);
        }
      },

      sendDelete() {
        this.$emit('send', this.index)
      }
    }
  }
</script>

<style scoped>
  .done {
    text-decoration: line-through;
  }
</style>
