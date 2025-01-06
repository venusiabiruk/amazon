import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import classes from "./productDetail.module.css";
import axios from "axios";
import { baseUrl } from "../../Api/BaseUrl";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [productID]);

  return <div>{loading ? <Loader /> : <ProductCard product={product} flex={true} desc={true} renderAdd={true}/>}</div>;
}
export default ProductDetail;