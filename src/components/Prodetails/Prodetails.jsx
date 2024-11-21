import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { cartContext } from "../../context/CartContext";
import $ from 'jquery';
import {Helmet} from "react-helmet";



export default function Prodetails() {
  const { addProductToCart ,removeCartItem} = useContext(cartContext);



 async function removeMyProduct(id){
    if(await removeCartItem(id)==true){

    $('.removeMsg').fadeIn(1000,function(){
      setTimeout(() => {
        $('.removeMsg').fadeOut(1000)
      }, 2500);
    })

    $('#delBtn').fadeOut(500);
    $('#addBtn').fadeIn(1000);

  }
  }

  async function addProducet(id) {
    if (await addProductToCart(id) == true) {
      $('.successMsg').fadeIn(1500,function(){
        setTimeout(() => {
          $('.successMsg').fadeOut(1000)
        }, 2500);
      })
        
        
          $('#addBtn').fadeOut(500);
          $('#delBtn').fadeIn(1000);
        
        
      
    }else{return false}
  }

  const { id } = useParams();

  const [ProductDetails, setProductDetails] = useState(null);

  async function getProdetails() {
    try {
      let { data } = await axios(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(function () {
    getProdetails();
  }, []);

  return (
    <>
     <Helmet>
                <title>Product Details</title>
            </Helmet>
      {ProductDetails ? (
        <div className="container my-5">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="img">
                <img src={ProductDetails.imageCover} className="w-100" alt="" />
              </div>
            </div>
            <div className="col-md-9">
              <div className="details">
                <h3 className="mb-3">{ProductDetails.title}</h3>
                <p className="text-muted">{ProductDetails.description}</p>
                <h6>price: {ProductDetails.price}</h6>
                <h6>category: {ProductDetails.category.name}</h6>
                <h6>Quantity: {ProductDetails.quantity}</h6>
                <button
                id="addBtn"
                  onClick={function () {
                    addProducet(ProductDetails.id);
                  }}
                  
                  className="btn bg-main bg-main-hover w-100 mt-3 text-white"
                >
                  Add To Card +
                </button>

                <button
                onClick={function(){removeMyProduct(ProductDetails.id)}}
                  id="delBtn"
                  style={{'display':'none'}}
                  className="btn  bg-danger w-100 mt-3 text-white"
                >
                  Remove from Card -
                </button>

                <div style={{'display':'none'}} className="alert alert-success text-center successMsg">
                  Products Added successfully...
                </div>

                <div style={{'display':'none'}} className="alert alert-success text-center removeMsg">
                  Products Removed successfully...
                </div>

              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
