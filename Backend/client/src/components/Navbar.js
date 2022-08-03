import React ,{useContext,useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import '../App.css';
import appContext from "../context/appContext"
import cart from '../images/cart.png'
export default function Navbar() {
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    navigate('/login')
  }
  const context = useContext(appContext)
  const {cartCount,getallcartitems}=context
  useEffect(() => {
    getallcartitems()
    // eslint-disable-next-line
}, [])
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid" >
          <Link className="navbar-brand" to="/">Shopify</Link>
          {localStorage.getItem('token') &&
          <>
          <Link className="nav-item nav-link" to="/cart"><img src={cart} /></Link>
          <span className="top-0 start-100 translate-middle cart-badge badge rounded-pill ">
            {cartCount}
          </span>
          </>}
          {!localStorage.getItem('token') ?
            <div className="nav-item-log-sign">
              <Link className="btn btn-outline-primary mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-outline-primary" to="/signup" role="button">Signup</Link></div> :
            <>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders</Link>
                  </li>
                  {localStorage.getItem('token') &&
                    <>

                      <Link className="btn btn-outline-primary nav-item-logout" to="/login" role="button" onClick={handlelogout}>Logout</Link></>
                  }
                </ul>
              </div>
            </>
          }
        </div >
      </nav>
    </div>

  )
}
