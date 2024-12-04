import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'

const initialState = {
    cartItems: [

    ]
    
}

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1300,
    background: "#A69080",
    color: "#28282B",
    iconColor: "#3E362E",
    timerProgressBar: true,
  });

const cartSlice = createSlice ({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if(!existingItem) {
                state.cartItems.push(action.payload)
                Toast.fire({
                    icon: "success",
                    title: "Item Added Successfully."
                  });
                
            } else {
                Toast.fire({
                    icon: "error",
                    title: "Item Already Exist."
                  });
                
            }
        },
        removeCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
            Toast.fire({
                icon: "warning",
                title: "Item Removed."
              });
        },
        clearCart: (state) => {
            state.cartItems = [];
            Toast.fire({
                icon: "warning",
                title: "Cart Cleared."
              });
        },
    }
})

//Export actions

export const {addToCart, removeCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

















