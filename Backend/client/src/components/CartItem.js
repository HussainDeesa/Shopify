import React, { useContext, useEffect, useRef, useState } from 'react'
import '../App.css';
import del from '../images/delete.png'
import appContext from '../context/appContext'

const Cart = (props) => {
  const context = useContext(appContext)
  const { getallcartitems, cart,deleteCart } = context
  const { quantity, name, position,Carts,setprogress } = props;
  useEffect(() => {
    getallcartitems();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <div className='cart-items '>
        <div className='cart-item '>
          <img className='cart-item-img' src={name[position][0].image}></img>
          <div className='cart-details '>
            <div className='cart-heading'>
              <h5 className='cart-title '>{name[position][0].name}</h5>
              <img className='del-cart-img' src={del} onClick={()=>{
                setprogress(25);
                deleteCart(Carts._id).then(()=>{
                  setprogress(100)
                })
                setprogress(75)
              }} ></img>
            </div>
            <span className='cart-price'>Price: {name[position][0].price} </span>
            <span className='cart-quantity'>Quantity: {quantity}  </span>
            <span className='cart-total'><b>Total : {quantity * name[position][0].price}</b> </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart