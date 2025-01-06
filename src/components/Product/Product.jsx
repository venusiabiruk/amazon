import React,{useState, useEffect} from 'react'
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from "./Product.module.css"
import Loader from '../Loader/Loader';
 
const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className={classes.product}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} renderAdd={true} />
          ))}
        </section>
      )}
    </>
  );
};
export default Product;