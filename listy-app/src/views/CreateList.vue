<template>
<v-container>
  <List :title="title" :category="category"></List>
  <ListFooter :total="total"  :founds="founds"></ListFooter>

</v-container>
</template>

<script>
import List from "@/components/List";
import ListFooter from "@/components/ListFooter";
export default {
name: "CreateList",
  data() {
    return {
      title:'Compra Semanal',
      category:'Familia',
      total: '0',
      founds: '0'
    }
  },
  components: {List,ListFooter}
}
</script>

<style scoped>

</style>
