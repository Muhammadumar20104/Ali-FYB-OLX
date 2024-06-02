import secureLocalStorage from "react-secure-storage";

export function fetchLoggedInUserOrders() {
  try {
    const token = secureLocalStorage.getItem("token");
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/orders/own/", {
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

export function fetchLoggedInUser() {
  try {
    const token = secureLocalStorage.getItem("token");
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/users/own", {
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

export function updateUser(update) {
  try {
    const token = secureLocalStorage.getItem("token");
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/users/" + update.id, {
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
