import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ProductList from "./pages/producList/ProductList";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Register from "./pages/register/register";
import Login from "./pages/Login/login";
import Cart from "./pages/cart/cart"
import Order from "./pages/order/order";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<Order/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
