import React from 'react'

const CartOrderBar = (props) => {
    const {total}=props
   
    return (
       <div className='cart-order-bar container'>
            <div >
                <span className='order-total'>Order Total : {total}</span>
                <div className='btn btn-primary btn-paynow'> Pay Now: <br/>
                <span>{total}</span></div>
            </div>
        </div>
    )
}

export default CartOrderBar