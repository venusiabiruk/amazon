import { Routes, Route } from "react-router-dom";
import React from "react";
import Landing from "./pages/Landing/Landing";
import Payment from "./pages/payment/Payment";
import Cart from "./pages/cart/Cart";
import Layout from "./components/Layout/Layout";
import Orders from "./pages/orders/Orders";
import Results from "./pages/Results/Results";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Auth from "./pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
const stripePromise = loadStripe(
  "pk_test_51QSfHe2LTVeuRDo0pNdZOyIhjAoRFbyI4qhd5dcm7qpzhYn52D3HErdzzFPu7jj4I92QKxiUTQQnKKfIZTLHLRMw00eh5EUQvL"
);
function Routing() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route
        path="*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/payments"
                element={
                  <ProtectedRoute
                    msg="you must login first to pay"
                    redirect="/payments"
                  >
                    <Elements stripe={stripePromise}>
                      <Payment />
                    </Elements>
                  </ProtectedRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/category/:categoryName" element={<Results />} />
              <Route path="/products/:productID" element={<ProductDetail />} />
              <Route
                path="/order"
                element={
                  <ProtectedRoute
                    msg="you must login to see your orders"
                    redirect="/orders"
                  >
                    <Orders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default Routing;
