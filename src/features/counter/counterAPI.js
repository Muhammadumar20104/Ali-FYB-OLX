import secureLocalStorage from "react-secure-storage";


export function fetchCount(amount = 1) {
 try {
  const token = secureLocalStorage.getItem("token");

  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080", {
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
