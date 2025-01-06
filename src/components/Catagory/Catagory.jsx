import React from 'react'
import {data} from "./catagoryData"
import CatagoryCard from './CatagoryCard'
import classes from "./catagory.module.css"
const Catagory = () => {
  return (
    <section className={classes.catagory__container}>
      {data.map(({ title, img,name }, index) => (
        <CatagoryCard key={index} title={title} img={img} name={name}/>
      ))}
    </section>
  );
}

export default Catagory

