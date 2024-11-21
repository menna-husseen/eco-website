
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import HomeSlider from "../HomeSlider/HomeSlider";
import { cartContext } from "../../context/CartContext";
import $ from 'jquery'
import {Helmet} from "react-helmet";



export default function Home() {

const {addProductToCart,removeCartItem}= useContext(cartContext)


async function removeMyProduct(id,indx){
  if(await removeCartItem(id,indx)==true){
  $('.removeMsg').fadeIn(1000,function(){
    setTimeout(() => {
      $('.removeMsg').fadeOut(1000);
    }, 3000);
  })

  $(`#delBtn${indx}`).fadeOut(1000)
  $(`#addBtn${indx}`).fadeIn(1000)
  

  
  
}}
async function addMyProduct(id,indx){
  if(await addProductToCart(id,indx)==true){
    
  $('.successMsg').fadeIn(1000,function(){
    setTimeout(() => {
      $('.successMsg').fadeOut(1000);
    }, 3000);
  })

  $(`#addBtn${indx}`).fadeOut(1000)
  $(`#delBtn${indx}`).fadeIn(1000)
  

  
  
}}


const [Allproduct, setAllproduct] = useState( null )

async function AllProducts(){
let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products?sort=price');
setAllproduct(data.data);

}

useEffect(function(){
  AllProducts()
},[]) 


  return (
    <>
              <Helmet>
                <title>Home</title>
            </Helmet>
<div style={ {'zIndex':'9999','display':'none'} } className="successMsg p-3 rounded text-center bg-dark text-white position-fixed start-0 top-0">Products Added successfully...</div>
<div style={ {'zIndex':'9999','display':'none'} } className="removeMsg p-3 rounded text-center bg-dark text-white position-fixed start-0 top-0">Products removed successfully...</div>

{Allproduct? <div className="container my-3 text-white">
  <HomeSlider/>
        <div className="row gy-4 mt-5 gx-3">
          {Allproduct.map(function(product,indx){return <div key={indx} className="col-md-2 rounded " >
           
            <div className="item  rounded-2 text-white text-center position-relative p-1" style={{'border':'0.5px solid green'}}>
            <Link to= {`/Prodetails/${product.id}`}>
              <div className="uper">
              <img src={product.imageCover} alt="" className="w-100 roundedn"  />
              <h6 className="fw-bolder  pt-3 text-secondary">{product.title.slice(0,product.title.indexOf(" ",10))}</h6>
              <h6 className="text-black">{product.category.name}</h6>
              <h6 className="pb-2 text-secondary"> {product.priceAfterDiscount?<><span className=" text-decoration-line-through me-2">{product.price}</span> <span>{product.price}</span></>:<span>{product.price}</span>} EGP</h6>
             <div className="position-absolute top-0 end-0   bg-main text-white p-1 rounded-1 d-flex justify-content-between align-items-center"><i className="fa-solid fa-star pe-2" style={{'color':'rgb(255, 208, 0)'}}  ></i> {product.ratingsAverage} </div>
             </div>
             </Link>
             <div className="lower mx-1">
              <button id={ `addBtn${indx}`} onClick={function (){addMyProduct(product.id , indx)}} className="btn bg-main bg-main-hover w-100 p-0 my-1 text-white fw-light">Add to cart</button>
              <button id={ `delBtn${indx}`} onClick={function (){removeMyProduct(product.id , indx)}} style={ {'display':"none"} } className="btn bg-danger w-100 p-0 my-1 text-white fs-6 fw-light">Remove from cart</button>
             </div>
            </div>
            
          </div>})}
          
        </div>
      </div> : <Loading/>}

    

     
    </>
  );
}
