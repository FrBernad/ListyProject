export default {
  async createList(context, payload) {
    let url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/lists.json?auth=` +
      context.rootGetters["token"];
    const response = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name:payload.name}),
      });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }

    const listId = responseData["name"];
    for (const item of payload.items) {
      await context.dispatch("addItem", {item: item, listId: listId});
    }
  },

  async addItem(context, payload) {
    let url = `https://listy-itba-app.firebaseio.com/users/` +
      context.rootGetters["userId"] +
      "/lists/" +
      payload.listId +
      "/items" +
      ".json?auth=" +
      context.rootGetters["token"];
    const response = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...payload.item}),
      });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }

    return responseData["name"];
  },

  async getLists(context) {
    let url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/lists.json?auth=` +
      context.rootGetters["token"];

    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }
    return responseData;
  },

  async getList(context,payload) {
    let url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/lists/${payload.listId}.json?auth=` +
      context.rootGetters["token"];

    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }
    return responseData;
  }

}
