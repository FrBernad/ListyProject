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
    if (payload.items != null)
      state.listItems = Object.values(payload.items);
    else
      state.listItems = [];

    state.listName = payload.name;
  },

  deleteFromList(state, payload) {
    state.listItems.splice(payload.index, 1);
  },


};
