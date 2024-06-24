import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const url = "http://localhost:4000/api";
  useEffect(() => {
    const fetchProducts = async () => {
      const api = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(api.data.product);
      setProduct(api.data.product);
    };
    fetchProducts();
  }, [id]);
  return (
    <>
      <div style={{marginTop:"100px"}}>
        <div
          className="container text-center my-5"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div className="left">
            <img
              src={product?.imgSrc}
              alt=""
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "10px",
                border: "2px solid yellow",
              }}
            />
          </div>
          <div className="right">
            <h1>{product?.title}</h1>
            <p>{product?.description}</p>
            <h1>
              {product?.price} {"₹"}
            </h1>
            <div className="my-5">
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
              >
                Buy Now
              </button>
              <button
                className="btn btn-warning"
                style={{ fontWeight: "bold" }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
