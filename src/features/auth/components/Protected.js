import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";
import secureLocalStorage from "react-secure-storage";

function Protected({ children }) {
  const user = secureLocalStorage.getItem("token");
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
}

export default Protected;
