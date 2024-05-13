import axios from "axios";
import { useSelector } from "react-redux";
import "./payButton.css"
const PayButton = ({cartItems})=>{

    const currentUser = useSelector((state) => state.user.currentUser);
    const handleCheckOut=()=>{
        axios.post("https://louis-a89w.onrender.com/api/stripe/create-checkout-session", {cartItems, userId: currentUser._id}, {withCredentials: true}).then((res)=>{
            if(res.data.url){
                window.location.href = res.data.url
            }
        }).catch((err)=>console.log(err.message))
    }
    return (
        <>
        <button className="btn" onClick={()=>handleCheckOut()}>Continue with Stripe</button>
        </>
    )
}

export default PayButton