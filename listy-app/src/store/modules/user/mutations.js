export default {
  setUserData(state, payload) {
    state.username = payload.username;
    state.avatarUrl = payload.avatarUrl;
  },
};
