import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Announcement from '../../components/Announcement/Announcement'
import Slider from '../../components/slider/Slider'
import Categories from '../../components/categories/Categories'
import Products from '../../components/products/Products'
import NewLetters from '../../components/newLetter/NewLetters'
import Footer from '../../components/Footer/Footer'
import Voucher from "../voucher/voucher"

const Home = () => {
  /*
  const { currentUser } = useSelector((state) => state.user);
  const notify = () => toast.error("Phiên đăng nhập hết hạn!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

    const userId = currentUser?._id;
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/orders/find/${userId}`,
            { withCredentials: true }
          );
          if(response.status === 401){
            notify()
          }
        } catch (err) {
         
        }
      };
      fetchOrders();
    }*/
// thêm scroll to top
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Voucher/>
      <Products />
      <NewLetters />
      <Footer />
    </div>
  )
}

export default Home