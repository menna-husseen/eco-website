import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import {Helmet} from "react-helmet";

export default function AllOrders({crrUser}) {

const [AllOrders, setAllOrders] = useState(null)
console.log(AllOrders);

async function allOrders(){
    const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${crrUser.id}`)
    // console.log(data);
    setAllOrders(data)
    console.log(AllOrders);
    
}

useEffect(() => {
  allOrders()
  
}, [])


  return (
    <>
     <Helmet>
                <title>All Orders</title>
            </Helmet>
      <div className="container">
        <h2>Hello {crrUser.name}</h2>
        {AllOrders?<div className="row">
            
            {AllOrders.map(function(order,indx){
             return <div key={indx} className="col-md-12">
             <div className="item bg-light p-2 my-3 rounded-3">
                 <h6>Price: {order.totalOrderPrice}</h6>
                 <h6>Order type: {order.paymentMethodType}</h6>
                 <p className="text-muted">this order with delvierd to <span className="text-success">({order.shippingAddress.details})</span>  in <span className="text-success">({order.shippingAddress.city})  </span> 
                      with this number <span className="text-success">({order.shippingAddress.phone})</span> 
                 </p>
                 
                 <div className="container">
                    <div className="row">
                        {order.cartItems.map(function(item,index){return <div key={index} className="col-sm-3  gy-3">
                            <div className="item gy-1 ">
                                <img src={item.product.imageCover} className="w-100" alt="" />
                                <div className="py-2 ">
                                <h6>title:{item.product.title.slice(0,10)}</h6>
                                <h6>count:{item.count}</h6>
                                <h6>price:{item.price}</h6>
                                </div>
                            </div>
                        </div>})}
                    </div>
                 </div>
             </div>
         </div>
            })}
                
            </div> : <Loading/>}
        
      </div>
    </>
  );
}
