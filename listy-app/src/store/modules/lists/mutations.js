export default {

  newList(state, payload) {
    state.listName = payload.listName;
  },

  addItem(state, payload) {
    state.listItems.push(payload);
  },

  resetList(state){
    state.listItems = [];
    state.listName = '';
  },

  deleteFromList(state, payload) {
    state.listItems.splice(payload.index, 1);
  },

};
