let timer;

export default {

  async signUp(context, payload) {

    let responseData = await context.dispatch('auth', {
      ...payload,
      mode: "signUp"
    });

    localStorage.setItem('userId', responseData.idToken);

    await context.dispatch("verifyEmail", responseData);

    const userData = {
      userAuth: {
        token: responseData.idToken,
        userId: responseData.localId,
      },
      userInfo: {
        username: payload.username,
        lists: []
      }
    };

    await context.dispatch('user/addUserToDB', userData);

  },


  async signIn(context, payload) {
    let responseData = await context.dispatch('auth', {
      ...payload,
      mode: "signIn"
    });

    let userMeta = await context.dispatch('getUserInfo', {
      ...responseData,
    });

    if (!userMeta.users[0].emailVerified) {
      localStorage.setItem('userId', responseData.idToken);
      throw 400;
    }

    await context.dispatch("setUserSession", {
      ...responseData
    });
  },

  async verifyEmail(context) {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${context.getters["apiKey"]}`
    const userId = localStorage.getItem('userId');
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: userId
      })
    });

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      throw new Error(responseData.message);
    }
  },
  async getUserInfo(context, payload) {
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${context.getters["apiKey"]}`

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: payload.idToken,
      })
    })

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      throw new Error(responseData.message);
    }
    return responseData;
  },

  async setUserSession(context, payload) {
    const expiresIn = +payload.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', payload.idToken);
    localStorage.setItem('userId', payload.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    const userAuth = {
      token: payload.idToken,
      userId: payload.localId,
    }

    context.commit('setUser', userAuth);

    let url = `https://listy-itba-app.firebaseio.com/users/${userAuth.userId}.json?auth=` +
      userAuth.token;

    let response = await fetch(url);

    let responseData = await response.json();

    if (!response.ok) {
      throw new Error("Error getting user data in login");
    }

    let userData = {username: ""};
    for (const key in responseData) {
      userData.username = responseData[key].username
    }

    context.commit("user/setUserData", userData);
  },

  async auth(context, payload) {
    let url;
    if (payload.mode === "signIn")
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${context.getters["apiKey"]}`;
    else if (payload.mode === "signUp")
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${context.getters["apiKey"]}`
    else
      throw new Error("invalid mode");

    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    })

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      throw new Error(responseData.message);
    }

    return responseData;
  },

  async tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 1000 * 60)
      return;

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });

      const url = `https://listy-itba-app.firebaseio.com/users/${userId}.json?auth=` +
        token;

      const response = await fetch(url);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error("Error getting user data in login");
      }
      let userData = {username: ""};
      for (const key in responseData) {
        userData.username = responseData[key].username
      }
      context.commit("user/setUserData", userData);
    }
  }
  ,

  autoLogout(context) {
    console.log("loggin out");
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
  ,

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  }
}
