import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Cart from "./components/pages/Cart";
import CheckOut from "./components/pages/CheckOut";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Product from "./components/pages/Product";
import Reviews from "./components/pages/Reviews";
import SignUp from "./components/pages/SignUp";
import Thank from "./components/pages/Thank";
import UserInfo from "./components/pages/UserInfo";
// import AuthProvider from "./context/AuthContext";

// toast-configuration method,
// it is compulsory method.

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_PRODUCT",
    });
  }, []);
  return (
    <>
      {/* <AuthProvider> */}
      <Routes>
        <Route path="/" element={<Navigate to={"/home"}></Navigate>}></Route>
        <Route path="/" element={<Header></Header>}>
          <Route
            path="/products"
            element={<Navigate to={"/products/1"}></Navigate>}
          ></Route>

          <Route
            path="/products/:productId"
            element={<Product></Product>}
          ></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/reviews" element={<Reviews></Reviews>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
          <Route path="/userinfo" element={<UserInfo></UserInfo>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/thank" element={<Thank></Thank>}></Route>
        </Route>
        {/* <Route path="/login" element={<Login></Login>}></Route> */}
      </Routes>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
