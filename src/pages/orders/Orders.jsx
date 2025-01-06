import React, { useContext, useEffect, useState } from "react";
import classes from "./orders.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { db } from "../../utils/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      const userOrdersRef = collection(db, "users", user.uid, "orders");
      const ordersQuery = query(userOrdersRef, orderBy("created", "desc"));
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);
  // useEffect(() => {
  //   if(user){
  //     db.collection("users").doc(user.id).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
  //       console.log(snapshot)
  //       setOrders(snapshot.docs.map((doc)=>{{
  //         id:doc.id,
  //         data:doc.data(),
  //       }}))
  //     })
  //   }else{
  //     setOrders([]);
  //   }
  // }, [user]);
  return (
    <section className={classes.container}>
      <div className={classes.orders__container}>
        <h2>Your Orders</h2>
        {/* ordered items */}
        {orders?.length == 0 && (
          <div style={{ padding: "20px" }}>You don't have any orders yet</div>
        )}
        <div>
          {orders?.map((order, i) => {
            return (
              <div key={`${order.id}-${i}`}>
                <hr />
                <p>order ID:{order?.id}</p>
                {order?.data?.basket?.map((ord) => {
                  return (
                    <ProductCard product={ord} flex={true} key={order.id} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Orders;
