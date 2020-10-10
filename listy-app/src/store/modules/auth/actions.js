export default {
  async signup(context, payload) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJpNwyGsEvaSuId3AqI9j4zoVC8zwPKls`, {
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

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });

    const userData = {
      username: payload.username,
    };

    await context.dispatch('user/addUserToDB', userData);
  },

  async signIn(context, payload) {
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJpNwyGsEvaSuId3AqI9j4zoVC8zwPKls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }),
    })

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message||"check ur data");
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });

    console.log(responseData);
    console.log(response);
  },

  logout(context){
    context.commit('setUser',{
      token:null,
      userId: null,
    })
  }
}
