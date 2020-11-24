<template>
  <v-navigation-drawer app
                       clipped
                       left
                       permanent
                       :expand-on-hover="$vuetify.breakpoint.smAndDown"
                       color="rgba(227,237,247,1)"
  >
    <v-list dense>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.route"
        class="itemList"
        exact
      >
        <v-icon class="pr-3">{{ item.icon }}</v-icon>
        <v-list-item-content>
          <h1 class="text-h6">{{ item.title }}</h1>
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
          {title: 'Mis Listas', icon: 'mdi-note-text-outline', route: '/home'},
          {title: 'Destacadas', icon: 'mdi-heart', route: '/home/destacadas'},
          {title: 'Grupos', icon: 'mdi-account-group', route: '/home/grupos'},
          {title: 'Ayuda', icon: 'mdi-help-circle', route: '/home/ayuda'}
        ],
      }
    },
  }
</script>

<style scoped>
  .itemList {
    font-size: 200px;
  }
</style>
