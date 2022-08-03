import React, { useState } from "react";
import appContext from "./appContext";

const ItemState = (props) => {

   // const host = 'http://localhost:5000/'
   const Initial = []
   const [items, setitems] = useState(Initial)
   const [cart, setCart] = useState(Initial)
   const [cartItems, setCartItems] = useState(Initial)
   const [Carts, setCarts] = useState(Initial)
   const [cartCount, setCartCount] = useState('')

   const getallitems = async () => {
      // API Call
      // const response = await fetch(`${host}api/notes/fetchallnotes`, {
      const response = await fetch('api/item/fetchallitems', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         }
      });
      const json=await response.json()
      setitems(json)
      
   }
   const addToCart = async (id) => {
      // API Call
      // const response = await fetch(`${host}api/notes/fetchallnotes`, {
      const response = await fetch(`api/cart/addtocart/${id}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
         }
      });
      const json=await response.json()
      // setCart(json)
   }
   const getallcartitems = async () => {
      // API Call
      // const response = await fetch(`${host}api/notes/fetchallnotes`, {
      const response = await fetch('api/cart/fetchallcartitems', {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
         }
      });
      const json=await response.json()
      setCartCount(json.cart_count)
      setCart(json.Item) 
      setCarts(json.Carts)
      setCartItems(json.Items) 
   }
   // DELETE cart
   const deleteCart = async (id) => {
      // API Call
      const response = await fetch(`api/cart/deletecart/${id}`, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
         },

      });
      const json = await response.json()
      await getallcartitems();

   }   
   return (
      <appContext.Provider value={{items,getallitems,addToCart,getallcartitems,cartCount,cart,cartItems,Carts,deleteCart }}>
         {props.children}
      </appContext.Provider>
   )
}

export default ItemState;