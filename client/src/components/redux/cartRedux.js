import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
        // Sản phẩm chưa có trong giỏ hàng, thêm mới
        state.quantity += 1;
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
      
    },
    increaseQuantity: (state, action) => {
      const productToUpdate = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productToUpdate) {
        productToUpdate.quantity += 1;
        state.total += productToUpdate.price;
      }
    },
    
    decreaseQuantity: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1 && state.products[productIndex].quantity > 1) {
        state.products[productIndex].quantity -= 1;
        state.total -= state.products[productIndex].price; 
      } else if (
        productIndex !== -1 &&
        state.products[productIndex].quantity === 1
      ) {
        state.total -= state.products[productIndex].price;
        state.quantity -= 1;
        state.products.splice(productIndex, 1);
      }
    },
    removeAllProducts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeAllProducts,
} = cartSlice.actions;
export default cartSlice.reducer;
