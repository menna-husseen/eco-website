import React, { useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import errorImg from './images/error.svg'
import Brands from './components/Brands/Brands'
import Prodetails from './components/Prodetails/Prodetails'
import BrandsProducts from './components/BrandsProducts/BrandsProducts'
import Profile from './components/Profile/Profile'
import { jwtDecode } from 'jwt-decode'
import Cart from './components/Cart/Cart'
import CartContextProvier from './context/CartContext'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import { Offline, Online } from "react-detect-offline";


export default function App() {

function ProtectedRoute({children}){

  if (crrUser==null) {
    return<>
<Navigate to='/login'/>
    </>
  }else{return<>
  {children}
  </>}
  
  
}



  const[crrUser,setcrrUser]=useState(null)

  function getUserData(){
    const userData= jwtDecode(localStorage.getItem("tkn"));
    setcrrUser(userData);
    // console.log(userData);
  }

  function clearUserdata(){
    localStorage.removeItem('tkn');
    setcrrUser(null)
  }
  
  useEffect(function(){
    if(localStorage.getItem('tkn')!=null && crrUser == null){
      getUserData()
    }
  },[])

 const router= createHashRouter([
    {path:"", element:<Layout clearUserdata={clearUserdata} crrUser={crrUser}/>,children:[
      {path:"",element:<CartContextProvier> <Home/> </CartContextProvier>},
      {path:"Payment",element:<CartContextProvier> <Payment crrUser={crrUser}/> </CartContextProvier>},
      {path:"Payment",element:<ProtectedRoute><CartContextProvier> <Payment crrUser={crrUser}/> </CartContextProvier></ProtectedRoute>},
      {path:"allOrders",element:<ProtectedRoute><CartContextProvier> <AllOrders crrUser={crrUser}/> </CartContextProvier></ProtectedRoute>},
      {path:"home",element:<CartContextProvier> <Home/> </CartContextProvier>},
      {path:"Profile",element: <ProtectedRoute> <Profile crrUser={crrUser}/> </ProtectedRoute>},
      {path:"cart",element: <ProtectedRoute> <CartContextProvier><Cart crrUser={crrUser}/></CartContextProvier> </ProtectedRoute>},
      {path:"brandPro/:id",element:<ProtectedRoute> <BrandsProducts/> </ProtectedRoute>},
      {path:"brands",element: <Brands/>},
      {path:"Prodetails/:id",element:<ProtectedRoute> <CartContextProvier> <Prodetails/> </CartContextProvier> </ProtectedRoute>},
      {path:"login",element:<Login getUserData={getUserData}/>},
      {path:"register",element:<Register/>},
      {path:"*",element:<div className=' text-center py-3 '>
<img src={errorImg} alt="" />
      </div>},
    ]}
  ])
  return <>
  <CartContextProvier>
  <Offline> <div className='netWork'>Only shown offline (surprise!)</div></Offline>
  <RouterProvider router={router}></RouterProvider>
</CartContextProvier>
 
  </>
}
