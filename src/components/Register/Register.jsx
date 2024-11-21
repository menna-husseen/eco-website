import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import $ from 'jquery'
import {Helmet} from "react-helmet";



export default function Register() {

  const [isLoadig, setisLoadig] = useState(false)
  const [MsgErr, setMsgErr] = useState(' ')
  let nav=useNavigate()

async function submitRegister(values){
  try {
    setisLoadig(true);
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values);
    if(data.message ==='success'){
      setisLoadig(false)
      nav('/Login')
    }
  } catch (error) {
    console.log(error);
    setMsgErr(error.response.data.message)
    setisLoadig(false)
    $('.errmsg').fadeIn(1000,function(){
      setTimeout(() => {
        $('.errmsg').fadeOut(1000)
      }, 2000);
    })
  }
 
}
let validation=yup.object({
  name:yup.string().required('name is required').min(3,'name minlength is 3').max(10,'name maxlength is 10'),
  email:yup.string().required('email is required').email('email is invalid'),
  password:yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,9}$/,'password must start with UpperCase and contain at least one number or lowercase letter from 5 to 9 characters'),
  rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')],'rePasswords do not match '),
  phone:yup.string().required('name is required').matches(/^01[0125][0-9]{8}$/,'Phone must be an Egyptian number'),
})

 let formik= useFormik({
initialValues:
  {
    name: "",
    email:" ",
    password:"",
    rePassword:"",
    phone:""
},
onSubmit: submitRegister,
validationSchema:validation,
})
  return <>
   <Helmet>
                <title>SignUP</title>
            </Helmet>

<div className="container">
  <h2 className="text-center my-5">Registration form</h2>
{MsgErr?<div className="alert alert-danger errmsg" style={{'display':'none'}}>{MsgErr}</div>:' '}

  <form onSubmit={formik.handleSubmit}>

    <label className='mt-3' htmlFor="name">Name:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" placeholder='name' className='form-control'/>
    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> :null}

    <label className='mt-3' htmlFor="email">Email:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" placeholder='email' className='form-control'/>
    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> :null}

    <label className='mt-3' htmlFor="phone">Phone:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" placeholder='phone' className='form-control'/>
    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> :null}

    <label className='mt-3' htmlFor="password">Password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" placeholder='password' className='form-control'/>
    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> :null}

    <label className='mt-3' htmlFor="rePassword">Re-Password:</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="Password" name="rePassword" id="rePassword" placeholder='re-Password' className='form-control'/>
    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> :null}

{isLoadig?<button type='button' className=' my-3 text-white btn bg-main bg-main-hover'><i class="fa fa-spinner fa-spin"></i></button> : <button disabled={!formik.isValid && formik.dirty} type='submit' className=' my-3 text-white btn bg-main bg-main-hover'>Register</button>}
  
  </form>
</div>

</>
}
