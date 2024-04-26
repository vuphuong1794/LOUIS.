import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import "./order.css"

const Order = () => {
    const [orders, setOrders] = useState(null);
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const userId = currentUser._id;

        const fetchOrders = async () => {
            const response = await axios.get(`http://localhost:8000/api/orders/find/${userId}`, {withCredentials: true});
            setOrders(response.data);
        };

        fetchOrders();
    }, []);

    if (!orders) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <div className="Title">Your Order</div>
            {orders ? (orders.map(order => (
                <div key={order._id} className="form">
                    <h2 className="ma">Đơn hàng: {order._id}</h2>
                    <p className="ngaydat">Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="tongtien">Tổng tiền: {order.amount} VND</p>
                    <p className="diachi">Địa chỉ: {order.address}</p>
                    <p className="trangthai">Trạng thái: {order.status}</p>
                    <h3 className="product">Sản phẩm:</h3>
                    <ul>
                        {order.products.map(product => (
                            <li key={product._id}>
                                Mã sản phẩm: {product.productId} - Số lượng: {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))): <span>No Order</span>}
        </div>
    );
};

export default Order;
