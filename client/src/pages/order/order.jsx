import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./order.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';

const Order = () => {
  const [orders, setOrders] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const notify = () =>
    toast.error("Please login again!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const handleDelOrder = async(OrderId)=>{
      try{
        await axios.delete(`https://louis-a89w.onrender.com/api/orders/${OrderId}`, {withCredentials: true})
      }catch(err){}
    }
    
    useEffect(() => {
      const userId = currentUser?._id || currentUser?.id;
    
      const fetchOrders = async () => {
        try {
          const res = await axios.get(
            `https://louis-a89w.onrender.com/api/orders/find/${userId}`,
            { withCredentials: true }
          );
          setOrders(res.data);
        } catch (err) {
          console.log("Error response:", err.response);
          notify();
        }
      };
      fetchOrders();
    }, [currentUser]);

  return (
    <div>
      <div className="Title">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <ArrowBackIosIcon />
        </Link>
        <span>Your Order</span>
        <div className="searchOrder">
          <input type="text" placeholder="Enter your orderID"/>
          <SearchIcon onClick={()=>console.log("hello")}/>
        </div>
      </div>
      {orders ? (
        orders.map((order) => (
          <div className="form-wrapper" key={order._id}>
            <div className="form">
              <h2 className="ma">Đơn hàng: {order._id}</h2>
              <p className="ngaydat">
                Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="tongtien">Tổng tiền: {order.amount} USD</p>
              <p className="diachi">Địa chỉ: {order.address}</p>
              <p className="trangthai">Trạng thái: {order.status}</p>
              <h3 className="product">Sản phẩm:</h3>
              <ul>
                {order.products.map((product) => (
                  <li key={product._id} className="productInfo">
                    <img src={product?.productImg} className="productImg"/>
                    Mã SP: {product.productId} - SL:{" "}
                    {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
            <div className="buttonCN"></div>
            <button className="huy" onClick={()=>handleDelOrder(order._id)}>Hủy đơn hàng </button>
            <button className="xem">Xem chi tiết </button>
          </div>
        ))
      ) : (
        <span>No Order</span>
      )}
      <ToastContainer />
    </div>
  );
};

export default Order;