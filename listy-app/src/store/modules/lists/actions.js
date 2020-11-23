export default {

  async createList(context, payload) {

    //add list to global lists
    let url = `https://listy-itba-app.firebaseio.com/lists.json?auth=` +
      context.rootGetters["token"];

    let response = await fetch(
      url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: payload.name,
          owner: context.rootGetters["userId"],
          users: []
        }),
      });

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }

    const listId = responseData["name"];

    for (const item of payload.items) {
      await context.dispatch("addItem", {item: item, listId: listId});
    }

    //add list to user lists
    url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/lists/${listId}.json?auth=` +
      context.rootGetters["token"];

    response = await fetch(
      url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: payload.name}),
      });

    responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }

  },

  async addItem(context, payload) {
    let url = `https://listy-itba-app.firebaseio.com/lists/` +
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

    let response = await fetch(url);

    let listsInfo = await response.json();

    if (!response.ok) {
      console.log(listsInfo)
      throw new Error("Error creating list");
    }

    return listsInfo ? listsInfo : {};
  },

  async getList(context, payload) {
    let url = `https://listy-itba-app.firebaseio.com/lists/${payload.listId}.json?auth=` +
      context.rootGetters["token"];

    const response = await fetch(url);

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error creating list");
    }
    return responseData;
  },

  async deleteList(context, payload) {

    //get global list data
    let url = `https://listy-itba-app.firebaseio.com/lists/${payload.listId}.json?auth=` +
      context.rootGetters["token"];

    let response = await fetch(url);

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error getting global list data when deleting");
    }

    let users = responseData.users;

    let owner = responseData.owner === context.rootGetters["userId"];

    //remove list from local user
    url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/lists/${payload.listId}.json?auth=` +
      context.rootGetters["token"];

    response = await fetch(
      url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

    if (!response.ok) {
      throw new Error("Error deleting list from user");
    }

    //if owner remove list from global lists
    if (owner) {
      url = `https://listy-itba-app.firebaseio.com/lists/${payload.listId}.json?auth=` +
        context.rootGetters["token"];

      response = await fetch(
        url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });

      if (!response.ok) {
        throw new Error("Error deleting list from user");
      }

      //delete list from all users
      for (const userId in users) {
        url = `https://listy-itba-app.firebaseio.com/users/${userId}/lists/${payload.listId}.json?auth=` +
          context.rootGetters["token"];

        response = await fetch(
          url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });

        if (!response.ok)
          throw new Error("Error deleting list from other user");
      }
    }
  },

  async favRoutine(context, payload) {
    let url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/favourites/${payload.listId}.json?auth=` +
      context.rootGetters["token"];

    let response = await fetch(
      url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: payload.name})
      });

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error faving routine");
    }
  },

  async unfavRoutine(context, payload) {
    let url = `https://listy-itba-app.firebaseio.com/users/${context.rootGetters["userId"]}/favourites/${payload.listId}.json?auth=` +
      context.rootGetters["token"];

    let response = await fetch(
      url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

    let responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      throw new Error("Error unfaving routine");
    }
  }

}
