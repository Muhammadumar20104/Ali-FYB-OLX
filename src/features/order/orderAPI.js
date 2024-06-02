import secureLocalStorage from "react-secure-storage";


export function createOrder(order) {
 try {
  const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {

    const response = await fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
 } catch (error) {
  console.log(error);
 }
}

export function updateOrder(order) {
  try {
    const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {

    const response = await fetch("http://localhost:8080/orders/" + order.id, {
      method: "PATCH",
      body: JSON.stringify(order),
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

export function fetchAllOrders(sort, pagination) {
try {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  const token = secureLocalStorage.getItem("token");
  return new Promise(async (resolve) => {

    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "http://localhost:8080/orders?" + queryString,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
} catch (error) {
  console.log(error);
}
}
