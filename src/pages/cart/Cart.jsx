import React, { useContext } from "react";
import classes from "./cart.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import { renderMatches, Link } from "react-router-dom";
import CurrencyFormatter from "../../components/Product/Currency/CurrencyFormatter";
import { Type } from "../../utils/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <section className={classes.container}>
      <div className={classes.cart__container}>
        <h2>Hello</h2>
        <h3>Your Shopping basket</h3>
        <hr />
        {basket?.length === 0 ? (
          <p>Opps! No item in your cart</p>
        ) : (
          basket.map((item, i) => (
            <section className={classes.cart__product}>
              <ProductCard
                key={i}
                product={item}
                desc={true}
                flex={true}
                renderAdd={false}
              />
              <div className={classes.button__container}>
                <button onClick={() => increment(item)}>
                  <IoIosArrowUp size={20} />
                </button>
                <span>{item.amount}</span>
                <button onClick={() => decrement(item.id)}>
                  <IoIosArrowDown size={20} />
                </button>
                {console.log(item.id)}
              </div>
            </section>
          ))
        )}
      </div>
      {basket?.length !== 0 && (
        <div className={classes.subtotal}>
          <div>
            <p>subtotal ({basket?.length} items)</p>
            <CurrencyFormatter amount={total} />
          </div>
          <span>
            <input type="checkbox" />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payments">Continue to Checkout</Link>
        </div>
      )}
    </section>
  );
}

export default Cart;
