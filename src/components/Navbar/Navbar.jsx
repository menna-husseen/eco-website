import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import logo from '../../images/freshcart-logo.svg'
import { cartContext } from '../../context/CartContext'


 
export default function Navbar({clearUserdata,crrUser}) {


const {numOfCart}=useContext(cartContext)
const navigate=useNavigate()
function logoutUser(){
  clearUserdata();
  navigate('./login')
}

  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-main-light position-fixed start-0 end-0 top-0 mb-5 z-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/home">
    <img src={logo} alt="freshLogo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brands">Brands</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/allOrders">all orders</Link>
        </li>
      </ul>   
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {crrUser?<><li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/Profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link px-2 position-relative" to="/cart"><i className='fas fa-regular fa-shopping-cart fa-lg p-3'></i>
          <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfCart}</span>
          </Link>
        </li>
        <li className="nav-item">
          <span onClick={logoutUser} className="nav-link logout">LogOut</span>
        </li></>:<><li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li></>}
        
      </ul>   
    </div>
  </div>
</nav>
</>
}
