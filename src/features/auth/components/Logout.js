import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Logout() {
  const user = secureLocalStorage.getItem("token");
  useEffect(() => {
    secureLocalStorage.removeItem("token");
  }, []);

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
