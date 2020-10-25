export default {
  async addUserToDB(context, payload) {
    const userId = payload.userAuth.userId
    const token = payload.userAuth.token

    const response = await fetch(`https://listy-itba-app.firebaseio.com/users/${userId}.json?auth=` +
      token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload.userInfo),
      });

    if (!response.ok) {
      throw new Error("Error loading user data to db");
    }

    const user = {
      username: payload.userInfo.username
    };

    context.commit("setUserData", user);
  },

}
