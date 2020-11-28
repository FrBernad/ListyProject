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
    let aux = [];
    if (payload.items != null) {
      Object.entries(payload.items).forEach(value => {
        value[1].id = value[0];
        aux.push(value[1]);
      })
    }
    state.listItems = aux;
    state.listName = payload.name;
  },

  setListMembers(state, payload) {
    const aux = [];
    for (const member of payload.members) {
      if (member.username !== payload.username) {
        aux.push(member)
      }
    }
    state.listMembers = aux;
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

  setGroupMembersData(state, payload) {
    const aux = [];
    aux.push(...payload.members)
    state.membersName = aux;
  }


};
