import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="py-3 bg-main-light">
        <div className="container">
          <h2>Get The FreshCard App</h2>
          <p>
            we will send you A link, open it in your phone to doanload the app
          </p>
        </div>
        <div className="container d-flex justify-content-between">
          <input
            type="email"
            className="form-control w-75"
            placeholder="Email..."
          />
          <button className="btn btn-success w-25 ms-3 bg-main bg-main-hover">Share App Link</button>
        </div>
        <div className="container d-flex align-items-center justify-content-between border-bottom border-top border-dark border-2 py-3 my-3 ">
          <div className="leftPart">
            <ul className="list-unstyled d-flex">
              <li>
                <h6>Payment Partner</h6>
              </li>
              <li className="text-primary ms-3">
                <i className="fa-brands fa-amazon-pay"></i>
              </li>
              <li className="text-primary ms-3">
                <i className="fa-brands fa-cc-mastercard"></i>
              </li>
              <li className="text-primary ms-3">
                <i className="fa-brands fa-paypal"></i>
              </li>
            </ul>
          </div>
          <div className="rightPart d-flex justify-content-end align-items-center">
            <h6>Get Deliveries With Freshcard</h6>
            <button className="btn btn-dark btn-lg mx-3 d-flex align-items-center">
              <i className="fa-brands fa-app-store me-2 fa-lg"></i>
              <span>
                Avaiable On <br /> App Store
              </span>
            </button>
            <button className="btn btn-dark btn-lg d-flex align-items-center">
              <i className="fa-brands fa-google-play me-2"></i>
              <span>
                Get it From <br />
                GooglePlay
              </span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
