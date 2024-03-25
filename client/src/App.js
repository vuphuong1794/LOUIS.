import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProductList from "./pages/producList/ProductList";
import SingleProduct from "./pages/SingleProduct/SingleProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/product" element={<SingleProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
