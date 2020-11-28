<template>
  <v-dialog v-model="paymentDialog" persistent width="500px">
    <v-stepper v-model="e1">

      <v-stepper-header>

        <v-stepper-step
          :complete="e1 > 1"
          step="1"
        >
          Miembro
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="e1 > 2"
          step="2"
        >
          Producto
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Pago
        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card

            class="mb-12 pa-5"
            height="200px"
          >
            <v-list-item-group
              v-model="selectedMember"
            >
              <v-list subheader>
                <v-subheader>Selecciona un miembro para pagarle</v-subheader>
                <v-list-item
                  v-for="member in listMembers"
                  :key="member.username"
                  dense
                  :disabled="!member.mercadoPagoToken"
                  v-if="member.username !== $store.getters['user/username']"
                >
                  <template v-slot:default="{ active }">

                    <v-list-item-avatar>
                      <v-img
                        max-width="35"
                        max-height="35"
                        :alt="`${member.username} avatar`"
                        :src="member.avatarUrl ? member.avatarUrl : require('../assets/images/emptyUser.png')"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="member.username"></v-list-item-title>
                      <v-list-item-subtitle v-if="!!member.mercadoPagoToken">
                        <span class="pr-2">Cuenta vinculada</span>
                        <v-icon small color="green">mdi-check</v-icon>
                      </v-list-item-subtitle>
                      <v-list-item-subtitle v-else>
                        <span class="pr-2">Cuenta no vinculada</span>
                        <v-icon small color="red">mdi-alpha-x-circle-outline</v-icon>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        color="primary"
                        :disabled="!member.mercadoPagoToken"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </v-list-item-group>
          </v-card>


              <v-btn color="primary" outlined text @click="closeStepper" class="mr-2">CANCELAR</v-btn>
              <v-btn color="primary" @click="e1 = 2" :disabled="selectedMember==null">CONTINUAR</v-btn>



        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card
            class="mb-12"
            height="200px"
          >
            <v-list-item-group
              v-model="items"
              multiple
            >
              <v-list subheader>
                <v-subheader>Selecciona los productos a pagar</v-subheader>
                <v-list-item
                  v-for="item in listItems"
                  :key="item.name"
                  dense
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.name+` (${item.quantity} x $${item.price})`"></v-list-item-title>
                      <v-list-item-subtitle v-text="'total:'+' $'+item.quantity*item.price"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        color="primary"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </v-list>
            </v-list-item-group>
          </v-card>
          <v-btn
            color="primary"
            @click="pay"
            :disabled="items.length==0"
          >
            Continuar
          </v-btn>

          <v-btn text @click="closeStepper" class="ml-2">
            Cancelar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            class="mb-12"
            height="200px"
          >
            <v-row class="align-center justify-center" style="height: 100%">
              <v-col cols="12">
                <h1 class="text-center text-h6">Accede al link y finaliza el pago</h1>
                <p class="text-center"><a target="_blank" :href="paymentLink">mercado pago</a></p>
              </v-col>
            </v-row>
          </v-card>
          <v-btn text @click="closeStepper">
            Finalizar
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
  import {sync} from 'vuex-pathify'

  export default {
    name: "PaymentDialog",
    props: ["paymentDialog"],
    data() {
      return {
        selectedMember: null,
        e1: 1,
        items: [],
        paymentLink: "https://www.facebook.com/"
      }
    },
    methods: {
      async pay() {
        const recipientInfo = this.listMembers[this.selectedMember];
        const payerName = this.$store.getters["user/username"];
        let amount = 0;
        for (const itemIndex of this.items) {
          let item = this.listItems[itemIndex];
          amount += item.quantity * item.price;
        }
        console.log({
          name: "Pago Listy " + payerName,
          price: amount,
          unit: 1,
          img: "https://github.com/FrBernad/ListyProject/blob/main/listy-app/src/assets/images/logonobg.png",
          token: recipientInfo.mercadoPagoToken
        });
        // try {
        //   const payment = await this.$store.dispatch("lists/pay", {
        //     name: "Pago Listy " + payerName,
        //     price: amount,
        //     unit: 1,
        //     img: "https://github.com/FrBernad/ListyProject/blob/main/listy-app/src/assets/images/logonobg.png",
        //     token: recipientInfo.mercadoPagoToken
        //   });
        //   console.log("payed");
        //   console.log(payment);
        // } catch (e) {
        //   console.log(e);
        // }
        this.e1 = 3;
      },

      closeStepper() {
        this.$emit('closeDialog')
        this.resetData();
      },

      resetData() {
        this.e1 = 1;
        this.selectedMember = "";
        this.items = [];
        this.paymentLink = "";
      }
    },
    computed: {
      ...sync('lists/*'),
    }
  }
</script>

<style scoped>

</style>
