import React from "react";
import classes from "./Carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "./data";

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((singleImg, index) => (
          <img src={singleImg} alt={`carousel-${index}`} key={index} />
        ))}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default CarouselEffect;
