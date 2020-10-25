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
        body: JSON.stringify(payload),
      });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }

    const listId = responseData["name"];
    for (const item in payload.items){
      await context.dispatch("addItem",{item:item,listId:listId});
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
        body: JSON.stringify(payload.item),
      });

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }

    return responseData["name"];
  }

}
