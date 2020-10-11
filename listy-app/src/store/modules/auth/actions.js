import {modes} from "vuetify/lib/components/VColorPicker/VColorPickerEdit";

export default {
  async signUp(context, payload) {
    await context.dispatch('auth', {
      ...payload,
      mode: "signUp"
    });

    const userData = {
      username: payload.username,
    };
    await context.rootState.dispatch('user/addUserToDB', userData);
  },

  async signIn(context, payload) {
    await context.dispatch('auth', {
      ...payload,
      mode: "signIn"
    });
  },

  async auth(context, payload) {
    let url;

    if (payload.mode === "signIn")
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJpNwyGsEvaSuId3AqI9j4zoVC8zwPKls";
    else if (payload.mode === "signUp")
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJpNwyGsEvaSuId3AqI9j4zoVC8zwPKls`
    else
      throw new Error("invalid mode");

    const response = await fetch(url, {
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

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData);
      throw new Error(responseData.message);
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime()+expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  }
}
