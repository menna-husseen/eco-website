import { useFormik } from "formik";
import React from "react";
import $ from'jquery'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Helmet} from "react-helmet";

export default function Login({getUserData}) {
  let user = {
    email: "",
    password: "",
  };

  let nav=useNavigate()

  async function loginUser(obj){
    try {
      let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,obj);
      if(data.message =='success'){       
        localStorage.setItem("tkn", data.token);
        getUserData();
        $('.successMsg').fadeIn(2000,function(){
          setTimeout(() => {
            $('.successMsg').fadeOut(2000)
            nav('/home')
          }, 1000);          

        }) 
      }
      
    } catch (err) {
      console.log(err);
      $('.errMsg').fadeIn(2000,function(){
        setTimeout(() => {
          $('.errMsg').fadeOut(1000)
        }, 3000);
      })

    }
   
   
  }

  let formik = useFormik({
    initialValues: user,
    onSubmit: function (values) {
      console.log("submit..");
      loginUser(values)
    },

    validate: function (values) {
      let errors = {};

      if (
        !values.email.includes("@") ||
        !values.email.includes(".com")
      ) {
        errors.email = "Email must be valid";
      }

      if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters ";
      }

      return errors;
    },
  });

  return (
    <>
     <Helmet>
                <title>Login</title>
            </Helmet>
      <div className="container my-4">
        <h2 className="mb-4">Login form</h2>
        <div style={{'textAlign':'center','display':'none'}} className="alert alert-danger errMsg">Email or Password incorrect</div>
        <div style={{'textAlign':'center','display':'none'}} className="alert alert-success successMsg">wellcome Back</div>
        <form onSubmit={formik.handleSubmit}>
   

          <label className="mt-3" htmlFor="email">Email</label>
          <input
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            id="email"
            placeholder="Email"
            type="email"
            className="form-control fw-bolder"
            // autocomplete="username"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="alert alert-danger text-center">{formik.errors.email}</div>
          )}

          <label className="mt-3" htmlFor="password">Password</label>
          <input
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            id="password"
            placeholder="Password"
            type="password"
            className="form-control fw-bolder"
            // autocomplete="new-password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="alert alert-danger text-center">{formik.errors.password}</div>
          )}

          <button className="btn btn-outline-primary btn-lg my-3" type="submit">
            Login
          </button>
          
        </form>
      </div>
    </>
  );
}

