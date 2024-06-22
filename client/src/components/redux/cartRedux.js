import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (existingIndex >= 0) {
        state.products[existingIndex] = {
          ...state.products[existingIndex],
          cartQuantity: state.products[existingIndex].cartQuantity + 1,
          quantity: state.products[existingIndex].quantity + 1,
        };
        toast.info("Increased product quantity", {
          position: "bottom-left",
        });
      } else {
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.products.push(tempProductItem);
      
        toast.success("Product added to cart", {
          position: "bottom-left",
        });
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    decreaseCart(state, action) {
      const itemIndex = state.products.findIndex(
        (item) => item._id === action.payload._id
      );

      if (state.products[itemIndex].cartQuantity > 1) {
        state.products[itemIndex].cartQuantity -= 1;
        state.products[itemIndex].quantity -= 1;

        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.products[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.products.filter(
          (item) => item._id !== action.payload._id
        );

        state.products = nextCartItems;
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },
    removeFromCart(state, action) {
      state.products.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.products.filter(
            (item) => item.id !== cartItem.id
          );
  
          state.products = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("products", JSON.stringify(state.products));
        return state;
      });
    },
    getTotals(state) {
      try {
        if (state.products && state.products.length > 0) {
          let { total, quantity } = state.products.reduce(
            (cartTotal, cartItem) => {
              const { price, cartQuantity } = cartItem;
              const itemTotal = price * cartQuantity;

              cartTotal.total += itemTotal;
              cartTotal.quantity += cartQuantity;

              return cartTotal;
            },
            {
              total: 0,
              quantity: 0,
            }
          );
          state.cartTotalQuantity = quantity;
          state.cartTotalAmount = total;
        } else {
          state.cartTotalQuantity = 0;
          state.cartTotalAmount = 0;
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearCart(state, action) {
      state.products = [];
      localStorage.setItem("products", JSON.stringify(state.products));
      toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});

export const { addToCart, clearCart, getTotals, removeFromCart, decreaseCart } =
  cartSlice.actions;
export default cartSlice.reducer;
