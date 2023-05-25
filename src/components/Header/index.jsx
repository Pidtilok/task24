import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "./images/logo.png";
import shoppingCart from "./images/shopping-cart.png";
import * as api from "../../services/api";
import { Link } from "react-router-dom";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus");
    const storedUserName = localStorage.getItem("userName");

    if (userStatus === "loggedIn" && storedUserName) {
      setLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  function handleLogout() {
    api.handleLogout(userName, setLoggedIn, setUserName, setUserInfo);
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link className="logo__link" to="/main">
              <img className="logo__image" src={logo} alt="" />
            </Link>
          </div>

          <div className="menu">
            {loggedIn ? (
              <>
                <div className="menu__greeting">Hi, {userName}</div>
                <div>
                  <div className="logout-button" onClick={handleLogout}>
                    Log out
                  </div>
                </div>
              </>
            ) : (
              <div className="menu__login">
                <Link className="menu__login-link" to="/login">
                  Hi, Log in
                </Link>
              </div>
            )}

            <div className="menu__image">
              <a className="menu__image-link" href="">
                <img
                  className="menu__image-picture"
                  src={shoppingCart}
                  alt=""
                />
              </a>
            </div>
            <div className="cart__count"></div>
          </div>
        </div>
      </header>
    </div>
  );
}
