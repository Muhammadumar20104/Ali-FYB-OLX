import secureLocalStorage from "react-secure-storage";

export function addToCart(item) {
 try {
  const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
 } catch (error) {
  console.log(error);
 }
}

export function fetchItemsByUserId() {
  try {
    const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/cart", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    resolve({ data });
  });
  } catch (error) {
    console.log(error);
  }
}

export function updateCart(update) {
  try {
    const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
  } catch (error) {
    console.log(error);
  }
}

export function deleteItemFromCart(itemId) {
  try {
    const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data: { id: itemId } });
  });
  } catch (error) {
    console.log(error);
  }
}

export function resetCart() {
 try {
   // get all items of user's cart - and then delete each
   const token = secureLocalStorage.getItem("token");
   return new Promise(async (resolve) => {
     const response = await fetchItemsByUserId();
     const items = response.data?.data;
     for (let item of items) {
       await deleteItemFromCart(item.id);
     }
     resolve({ status: "success" });
   });
 } catch (error) {
  console.log(error);
 }
}
