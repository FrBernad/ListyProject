export default {

  newList(state, payload) {
    state.listName = payload.listName;
  },

  addItem(state, payload) {
    state.listItems.push(payload);
  },

  resetList(state) {
    state.listItems = [];
    state.listName = '';
  },

  setList(state, payload) {
    state.listItems = Object.entries(payload.items);
    state.listName = payload.name;
  },

  deleteFromList(state, payload) {
    state.listItems.splice(payload.index, 1);
  },

};
