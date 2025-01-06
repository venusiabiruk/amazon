import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import { useParams } from "react-router-dom";
import {baseUrl} from "../../Api/BaseUrl";
import ProductCard from "../../components/Product/ProductCard";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
function Results() {
  let { catagoryName } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/products/category/${catagoryName}`)
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [catagoryName]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {catagoryName}</p>
          <div className={classes.product}>
            {results.map((product) => (
              <ProductCard key={product.id} product={product} desc={false} renderAdd={true} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
export default Results;