import React, { useState, useContext } from "react";
import logo from "../../assets/logo.png";
import classes from "./signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../utils/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  // console.log(email)
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name === "signIn") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img src={logo} alt="amazon logo" />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign-In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signIn"
            className={classes.login__signIn}
          >
            {" "}
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "sign in"}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing in you agree to the AMAZON_FAKE_CLONE conditions of the use
          & Terms. Please see our Privacy Notice, our Cookies Notice and our
          Interest Based Ads Notice
        </p>
        {/* create account button */}
        <button
          type="submit"
          onClick={authHandler}
          name="signUp"
          className={classes.signUp}
        >
          {" "}
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small
            style={{
              paddingTop: "5px",
              color: "red",
              textAlign: "center",
            }}
          >
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
