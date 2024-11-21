import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import $ from 'jquery'
// import { useNavigate } from 'react-router-dom';
export const cartContext =createContext();

export default function CartContextProvier({children}) {

async function addProductToCart(proId){
        try {
            const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
                'productId':proId},{headers:{'token':localStorage.getItem('tkn')}});
                console.log(data);

                if(data.status === 'success'){
                    return true

                }else{
                    return false
                }


        } catch (error) {
            console.log('error:', error);
            
        }
        
}


// const nav=useNavigate()

const [numOfCart, setNumOfCart] = useState(0)
const [totalCartPrice, setTotalCartPrice] = useState(0)
const [cartProducts, setCartProducts] = useState(0)
const [cartId, setcartId] = useState(null)

async function getCartProducts(){
    try {
        const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
            headers:{'token':localStorage.getItem('tkn')} 
        })
        console.log(data);

        if(data.status=== 'success'){
            setNumOfCart(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProducts(data.data.products)
            setcartId(data.data._id)
        }

    } catch (error) {
        console.log('error:',error);
        
        
    }
}

 async function removeCartItem(id){
    try {
        const{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{'token':localStorage.getItem('tkn')}})
            if(data.status=='success'){
                setNumOfCart(data.numOfCartItems)
                setTotalCartPrice(data.data.totalCartPrice)
                setCartProducts(data.data.products)
                return true
            }else {return false };     
    } catch (error) {
        console.log('error',error);
        
    }
 }
async function upDateCount(id,count){
    try {
        const {data}=  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                "count": count
            },{headers:{'token':localStorage.getItem('tkn')}})
            if(data.status=='success'){
                setNumOfCart(data.numOfCartItems)
                setTotalCartPrice(data.data.totalCartPrice)
                setCartProducts(data.data.products)
                return true
            }else {return false }; 
    } catch (error) {
        console.log('error',error);
        
    }
   
}


useEffect(function(){
    getCartProducts()
},[])



  return <cartContext.Provider value={ {addProductToCart,cartProducts,numOfCart,setNumOfCart,totalCartPrice,removeCartItem,upDateCount,cartId} }>
 <div style={ {'display':'none'} } className='alert alert-danger errCart'>
    no cart Exist
 </div>
  
  {children}
  </cartContext.Provider>
}
