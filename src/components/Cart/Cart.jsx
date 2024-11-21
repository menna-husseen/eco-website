import React, { useContext, useEffect, useState} from "react";
import { cartContext } from "../../context/CartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import {Helmet} from "react-helmet";

export default function Cart({ crrUser }) {
  

  const { cartProducts, totalCartPrice,removeCartItem, upDateCount } = useContext(cartContext);
  console.log(cartProducts);
  


  return <>
   <Helmet>
                <title>Cart</title>
            </Helmet>
    
    <div className="container mb-3">
        <h2 className="text-center py-5 mb-5">wellcome {crrUser.name}</h2>
       

      { cartProducts.length>0 ? <div className="container">
        <div className="bg-body-secondary  mb-5 d-flex justify-content-between align-items-center w-100 container ">
        <h3>Total Price: <span className="text-primary">{totalCartPrice}</span></h3>
        <Link to={'/Payment'} >
        <button className="btn bg-main bg-main-hover w-100 py-2 text-white " id="btnConfirm">Confirm</button>
        </Link>
        </div>
          <div className="row">
              {cartProducts.map(function (pro, index) {return<div key={index} className="col-md-3 ">
                <div  className="item border rounded">
                    <img
                      src={pro.product.imageCover}
                      className="w-100"
                      alt=""
                    />
                    <div className="px-4 py-2 ">
                    <h5>title: {pro.product.title.slice(0,13)}</h5>
                    <h5>count: {pro.count}</h5>  
                    <h5>price: {pro.price}</h5>
                    <input type="number" onChange={function(e){upDateCount(pro.product.id , e.target.value)}} className="form-control  my-2 bg-main-light text-black text-center" min={1} value={pro.count} placeholder="count..."/>
                    <button onClick={function(){removeCartItem(pro.product.id)}} className="btn btn-outline-danger w-100 " >Remove</button>
                    </div>
                  </div>
                  </div>
                
              })}
            </div>
          </div> 
      : <>
      <div className="alert alert-danger">No Product Added to Cart</div>
      <h3>Total Price: <span className="text-primary">{totalCartPrice}</span></h3>
      <Loading /> 
      </>
      }
      </div>

    </>
}
