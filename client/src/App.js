import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ProductList from "./pages/producList/ProductList";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Register from "./pages/register/register";
import Login from "./pages/Login/login";
import Cart from "./pages/cart/cart"
import { useSelector } from "react-redux";

function App() {
  
  const ProtectedRoute = ({ children }) => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleProduct/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
