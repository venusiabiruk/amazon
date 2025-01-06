import React from 'react'
import classes from "./catagory.module.css"
import { Link } from 'react-router-dom';
const CatagoryCard = ({ title, img, name}) => {
  return (
    <div className={classes.catagory}>
      <Link to={`/category/${name}`}>
        <span>
          <h2>{title}</h2>
        </span>
        <img src={img} alt={title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
};

export default CatagoryCard;
