import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Brands() {

const [Allbrands, setAllbrands] = useState(null)

     
async function getBrands(){
    try {
        let {data}=await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
        setAllbrands(data.data)
 
    } catch (error) {
        console.log('err:',error);
        
    }

}
 
useEffect(function(){
    getBrands()
},[])


  return <>

{Allbrands?  <div className="container mb-5">
    <div className="row align-items-center gy-2"> 
        <div className="col-md-3">
            <div className="brands mt-5 p-2 ">
                <h4 className='text-primary fw-medium'>Our Brands</h4>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga at fugit quidem nulla. Impedit, nostrum.</p>
            </div>
        </div>
        
        {Allbrands.map(function(brand,indx){return <div key={indx} className="col-md-3">
        <Link to={`/brandPro/${brand._id}`}>
            <div className="brands">
              <img src={brand.image} className='w-100' alt={brand.name} />
               <h6 className='bg-primary w-50 p-1 text-white text-center m-auto rounded-1'>{brand.name}</h6>
            </div>
            </Link>
        </div>})}
        
         
    </div>
  </div> : <Loading/>}

  </>
}
