import React, { useContext } from "react";
import { Rating } from "@mui/material";
import CurrencyFormatter from "./Currency/CurrencyFormatter";
import classes from "./Product.module.css"
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../utils/action.type";
const ProductCard = ({product, flex, desc, renderAdd }) => {
  if (!product) return <Loader/>; 
   const {image, title, id, rating,price,description}=product;
  const [state,dispatch]=useContext(DataContext)
  //  console.log(state)
   const addToCart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, id, rating, price, description },
    });
   }
  return (
    <div
      className={`${classes.product__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title} </h3>
        {desc && (
          <div style={{ maxWidth:"700px" ,lineHeight: "1.4" }}>
            {description}
          </div>
        )}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* price */}
          <small>{rating?.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormatter amount={price} />
        </div>
        {renderAdd && <button className={classes.btn} onClick={addToCart}>add to cart</button>}
      </div>
    </div>
  );
};

export default ProductCard;
