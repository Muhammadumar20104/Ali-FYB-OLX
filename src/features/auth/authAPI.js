import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const token = secureLocalStorage.getItem("token");

export function createUser(userData) {
  try {
    return new Promise(async (resolve) => {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      resolve({ data });
    });
  } catch (error) {
    console.log(error);
  }
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        secureLocalStorage.setItem("token", data?.accessToken);
        if (data.status == 200) {
          resolve({ data });
          // alert.success(data.message);
        } else {
          // alert.warn(data.message);
        }
      } else {
        const error = await response.text();
        reject(error);
      }

      // TODO: on server it will only return some info of user (not password)
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = secureLocalStorage.getItem("token");

      if (token) {
        resolve(token);
      } else {
        const error = "Invalid token";
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
