import React, { useContext, useEffect, useRef, useState } from 'react'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'
import appContext from '../context/appContext'
import CartOrderBar from './CartOrderBar'
const Cart = (props) => {

    const { setprogress, showAlert, alert } = props
    props.setprogress(0)
    const context = useContext(appContext)
    const { getallcartitems, cart, cartItems, Carts, cartCount } = context
    const runCallback = (cb) => {
        return cb();
    };
    let total_price=0;

    useEffect(() => {
        getallcartitems()
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div  >
                <h1 className='cart'>Cart</h1>
            </div>
            {cartCount === 0 && <div className='cart-empty'><span>Cart is empty..<br /><Link className='continue-shopping' to='/'>Continue Shopping</Link></span>  </div>}
            <div className='row my-3'>
                {cartCount !== 0 && cart.map((element) => {
                    let j = -1
                    return element['quantity'].map((i) => {
                        j++
                        total_price+=cartItems[j][0].price*i.quantity
                        return <CartItem key={i._id} name={cartItems} position={j} quantity={i.quantity} Carts={Carts[j]} setprogress={setprogress} />
                    })
                })
            }
            </div>
            <br/>
            <br/>
            <CartOrderBar total={total_price}/>
        </>
    )
}
export default Cart