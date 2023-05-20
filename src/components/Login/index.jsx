import React, { useState, useEffect } from "react";
import "./style.css";

const usersUrl = "https://634e9f834af5fdff3a625f84.mockapi.io/users";

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [verify, setVerify] = useState("");

  

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

  function handleSignIn(event) {
    event.preventDefault();
  
    fetch(`${usersUrl}?email=${email}&password=${password}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setError("Invalid email");
        } else {
          const user = data[0];
          if (user.password !== password) {
            setError("Invalid password");
          } else {
            localStorage.setItem("userStatus", "loggedIn");
            localStorage.setItem("userName", user.name);
            user.status = true;
            fetch(`${usersUrl}/${user.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            })
              .then(() => {
                setLoggedIn(true);
                setUserName(user.name);
                window.location.href = "./index.html";
              })
              .catch((error) => console.error(error));
          }
        }
      })
      .catch((error) => console.error(error));
  }
  

  function handleRegistration(event) {
    event.preventDefault();

    if (password !== verify) {
      setError("Password does not match!");
      return;
    }

    fetch(`${usersUrl}?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setError(`User with email ${email} already exists!`);
        } else {
          const user = {
            name: name,
            email: email,
            password: password,
            status: true,
            orders: [],
            shoppingCart: [],
          };
          fetch(usersUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          })
            .then(() => {
              window.location.href = "./index.html";
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <div className="containerSing">
        <div className="sing">
          <h1 className="title">Secure Sign In</h1>
          <p className="sing__description">For current customers</p>
          <form className="login-form" onSubmit={handleSignIn}>
            <div className="error">{error}</div>
            <div>
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="submit">
              Sign in
            </button>
          </form>
        </div>

        <div className="registr">
          <h1 className="title">Quick Registration</h1>
          <p className="registr__description">For new customers</p>
          <form className="registr__form" onSubmit={handleRegistration}>
            <div className="error">{error}</div>
            <div>
              <label htmlFor="name"></label>
              <input
                type="text"
                id="name"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="verifyEmail"></label>
              <input
                type="email"
                id="verifyEmail"
                name="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="verifyPassword"></label>
              <input
                type="password"
                id="verifyPassword"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="verify"></label>
              <input
                type="password"
                id="verify"
                placeholder="Verify Password"
                required
                value={verify}
                onChange={(e) => setVerify(e.target.value)}
              />
            </div>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </div>

      {loggedIn && userInfo && (
        <div className="info__item">
          <div className="info__name">Name: {userInfo.name}</div>
          <div className="info__email">Email: {userInfo.email}</div>
        </div>
      )}

      <div className="menu">
        {loggedIn ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <a href="./sing.html" className="menu__login">
            Log in
          </a>
        )}
      </div>
    </div>
  );
}
