import { Link, Navigate } from "react-router-dom";
import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product-list/components/ProductList";
import Footer from "../features/common/Footer";
import { useSelector } from "react-redux";
import { selectLoggedInUser, selectUserChecked } from "../features/auth/authSlice";
import Home2 from "./Home2";

function Home() {
  const userChecked = useSelector(selectUserChecked);

  return (
    <div>
      {/* {!userChecked && <Navigate to="/login" replace={true}></Navigate>} */}
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Footer></Footer>
    </div>
  );
}

export default Home;
