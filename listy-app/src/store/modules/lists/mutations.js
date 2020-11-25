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

  setGroup(state, payload) {
    if (payload.members != null)
      state.members = Object.values(payload.members);
    else
      state.members = [];

    state.owner = payload.owner;
    state.groupName = payload.name;
  },
  resetGroup(state) {
    state.members = [];
    state.membersName = [];
    state.groupName = '';
    state.owner = '';
  },
  deleteFromGroup(state, payload) {
    state.members.splice(payload.index, 1);
  },
  addMember(state, payload) {
    state.members.push(payload);
  },

  setNames(state,payload){
    state.membersName.push(...payload.members);
  }


};
