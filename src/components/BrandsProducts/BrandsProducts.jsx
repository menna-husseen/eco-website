import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import {Helmet} from "react-helmet";

export default function BrandsProducts() {
  const { id } = useParams();
  const [allProducts, setallProducts] = useState(null);

  async function allBrandsProduct() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`,
        { params: { brand: id } }
      );
      setallProducts(data.data);
    } catch (error) {
      console.log("error:", error);
    }
  }

  useEffect(() => {
    allBrandsProduct();
  }, []);

  return (
    <>
     <Helmet>
                <title>Brands</title>
            </Helmet>
      {allProducts ? (
        <div className="container">
          <div className="row">
            {allProducts.length === 0 ? (
              <h2 className="text-center fw-bolder my-3">
                No Produsts Avaible Right Now...
              </h2>
            ) : (
              allProducts.map(function (brands, indx) {
                return (
                  <div key={indx} className="col-md-3">
                    <Link to={`/Prodetails/${brands.id}`}>
                      <div className="item">
                        <img
                          src={brands.imageCover}
                          className="w-100"
                          alt={brands.title}
                        />
                        <h4>{brands.title}</h4>
                        <h5 className="my-3 fw-bolder">
                          price: {brands.price}
                        </h5>
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
