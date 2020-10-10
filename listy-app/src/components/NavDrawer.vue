<template>
  <v-navigation-drawer app
                       clipped
                       left
                       permanent
                       :expand-on-hover="$vuetify.breakpoint.smAndDown"
  >
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-h7">{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "NavDrawer",
    data() {
      return {
        items: [
          {title: 'Mis Listas', icon: 'mdi-note-text-outline'},
          {title: 'Destacadas', icon: 'mdi-star'},
          {title: 'Grupos', icon: 'mdi-account-group'},
        ],
      }
    },
  }
</script>

<style scoped>

</style>
