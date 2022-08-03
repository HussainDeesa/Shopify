import React, { useContext, useState } from 'react'
import appContext from "../context/appContext"

const Item = (props) => {
    const Context = useContext(appContext)
    const { getallitems, getallcartitems } = Context
    const { items, setprogress } = props;
    const [cart, setCart] = useState({ item_id: '', quantity: '1' })
    const add_to_cart = document.querySelectorAll('.add-to-cart-btn')
    // getallcartitems();
    let handleAddToCart
    const handleOnChange = (e) => {
        setCart({ ...cart, [e.target.name]: e.target.value })
    }
    add_to_cart.forEach(button=>button.addEventListener('click',()=>{
        button.classList.remove('add-to-cart-btn');
        button.classList.add('adding-to-cart');
        button.innerHTML='Adding..'
         handleAddToCart = (id) => {
            setprogress(25)
            // e.preventDefault()
            addToCart(id, () => {
            })
            setTimeout(() => {
                button.classList.remove('adding-to-cart');
                button.classList.add('add-to-cart-btn');
                button.innerHTML='Add To Cart'
            }, 2000);
        }
    }))
    const addToCart = async (id,e) => {
        const response = await fetch(`api/cart/addtocart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify({ item_id: id, quantity: cart.quantity })
        });
        console.log(add_to_cart.value);
       

        setprogress(85)
        setTimeout(() => {
            getallcartitems()
            setprogress(100)
        }, addToCart);
    }
   
    return (
        <div className="card items-card" style={{ width: '18rem' }}>
            <img src={items.image} className="card-img-top items-img" alt="..." />
            <span className="position-absolute category-badge badge translate-middle  rounded-pill">
                {items.category}
            </span>

            <div className="card-body">
                <h5 className="card-title" id='name'>{items.name}</h5>
                <p className="card-text" id='price'>Price: ₹{items.price}</p>
                <form >
                    <label htmlFor="description" className="label-quantity">Quantity: </label>
                    <select value={cart.quantity} className='input-quantity' name='quantity' onChange={handleOnChange} required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <div className='add-to-cart '>
                        <a href="#" className="btn btn-primary add-to-cart-btn " onClick={() => {
                            handleAddToCart(items._id)
                        }} >Add to cart</a></div>
                </form>
            </div >
        </div >
    )
}

export default Item 