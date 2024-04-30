import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./order.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


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

  useEffect(() => {
    const userId = currentUser._id;
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/orders/find/${userId}`,
          { withCredentials: true }
        );
        setOrders(response.data);

        if(response.status !=200){
            notify()
        }
      } catch (err) {}
    };
    fetchOrders();
  }, []);

  if (!orders) {
    return <div className="">Đang tải...</div>;
  }

  return (
    <div>
      <div className="Title">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <ArrowBackIosIcon />
        </Link>
        <span>Your Order</span>
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
                  <li key={product._id}>
                    Mã sản phẩm: {product.productId} - Số lượng:{" "}
                    {product.quantity}
                  </li>
                ))}
              </ul>
            </div>
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
