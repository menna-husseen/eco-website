import axios from 'axios';
import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Payment({crrUser}) {
 const nav= useNavigate()
const {cartId}=useContext(cartContext)

async function confirmCashOrder(){
try {
  const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      "shippingAddress":{
          "details":document.querySelector('#AdessDetails').value,
          "phone": document.querySelector('#Phone').value,
          "city":document.querySelector('#City').value
          }
  }
  ,{headers:{'token':localStorage.getItem('tkn')}})
  // console.log(data);
  if(data.status=='success'){
    nav('/allOrders')
  }
  

} catch (error) {
  console.log('err',error);
  
}
}


async function confirmCreditOrder(){
  try {
    const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
      {
        "shippingAddress":{
            "details":document.querySelector('#AdessDetails').value,
            "phone": document.querySelector('#Phone').value,
            "city":document.querySelector('#City').value
            }
    }
    ,{
      headers:{'token':localStorage.getItem('tkn')},
      params:{'url':'http://localhost:3000'}
  })

    if(data.status =='success'){
      window.open(data.session.url)
    }
    
  
  } catch (error) {
    console.log('err',error);
    
  }
  }


  return <>
  <h2 className='text-center mb-5'>Hello {}</h2>

  <form className='text-center w-50 m-auto'>
    <label htmlFor="AdessDetails" className='mt-2'>Adess Details</label>
    <input type="text" id='AdessDetails' name='AdessDetails' placeholder='AdessDetails' className='form-control' />
  
    <label htmlFor="Phone" className='mt-2'>Phone</label>
    <input type="text" id='Phone' name='Phone' placeholder='Phone' className='form-control' />
  
    <label htmlFor="City" className='mt-2'>City</label>
    <input type="text" id='City' name='City' placeholder='City' className='form-control' />
  
  <button onClick={confirmCashOrder} type='button' className='btn bg-main bg-main-hover my-3 text-white me-3'>confirm Cash</button>
  <button onClick={confirmCreditOrder} type='button' className='btn bg-main bg-main-hover my-3 text-white'>confirm Credit</button>
  </form>
  </>
}
