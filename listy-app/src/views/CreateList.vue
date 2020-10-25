<template>
<v-container>
  <List :title="listName"></List>
  <ListFooter :total="total"  :founds="founds"></ListFooter>
</v-container>
</template>

<script>
import List from "@/components/List";
import ListFooter from "@/components/ListFooter";
import {get} from "vuex-pathify";
export default {
name: "CreateList",
  data() {
    return {
      total: '0',
      founds: '0'
    }
  },

  computed:{
    ...get("lists/*")
  },

  components: {List,ListFooter}
}
</script>

<style scoped>

</style>
