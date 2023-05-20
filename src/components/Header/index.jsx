import React, { useState, useEffect } from "react";
import './style.css';
import logo from './images/logo.png';
import shoppingCart from './images/shopping-cart.png';

const usersUrl = "https://634e9f834af5fdff3a625f84.mockapi.io/users";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  function checkLoginStatus() {
    const userStatus = localStorage.getItem("userStatus");
    const storedUserName = localStorage.getItem("userName");

    if (userStatus === "loggedIn" && storedUserName) {
      setLoggedIn(true);
      setUserName(storedUserName);

      fetch(`${usersUrl}?name=${storedUserName}`)
        .then((response) => response.json())
        .then((data) => {
          const user = data[0];
          setUserInfo(user);
        })
        .catch((error) => console.error(error));
    }
  }

  function handleLogout() {
    fetch(`${usersUrl}?name=${userName}`)
      .then((response) => response.json())
      .then((data) => {
        const user = data[0];
        user.status = false;
        localStorage.removeItem("userStatus");
        localStorage.removeItem("userName");
        fetch(`${usersUrl}/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        })
          .then(() => {
            setLoggedIn(false);
            setUserName("");
            setUserInfo(null);
            window.location.href = "./index.html";
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="logo">
            <a className="logo__link" href="./index.html">
              <img className="logo__image" src={logo} alt="" />
            </a>
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
                <a className="menu__login-link" href="">Hi, Log in</a>
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
