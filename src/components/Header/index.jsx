// import React, { useState, useEffect } from "react";
// import "./style.css";
// import logo from "./images/logo.png";
// import shoppingCart from "./images/shopping-cart.png";
// import * as api from "../../services/api";
// import { Link } from "react-router-dom";


// export default function Header() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userInfo, setUserInfo] = useState(null);

//   const [cartCount, setCartCount] = useState(0);
//   const [shopCart, setShopCart] = useState([]);


//   useEffect(() => {
//     const userStatus = localStorage.getItem("userStatus");
//     const storedUserName = localStorage.getItem("userName");

//     if (userStatus === "loggedIn" && storedUserName) {
//       setLoggedIn(true);
//       setUserName(storedUserName); 
//     }
//     updateCartCount(); 
//   }, [shopCart]);


//   function handleLogout() {
//     api.handleLogout(userName, setLoggedIn, setUserName, setUserInfo);
//   }

//   function updateCartCount() {
//     const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
//     setShopCart(storedCart);
//     setCartCount(storedCart.length);
//   }
  
//   return (
//     <div>
//       <header className="header">
//         <div className="container">
//           <div className="logo">
//             <Link className="logo__link" to="/main">
//               <img className="logo__image" src={logo} alt="" />
//             </Link>
//           </div>

//           <div className="menu">
//             {loggedIn ? (
//               <>
//                 <div className="menu__greeting">Hi, {userName}</div>
//                 <div>
//                   <div className="logout-button" onClick={handleLogout}>
//                     Log out
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="menu__login">
//                 <Link className="menu__login-link" to="/login">
//                   Hi, Log in
//                 </Link>
//               </div>
//             )}

//             <div className="menu__image">
//               <a className="menu__image-link" href="">
//                 <img
//                   className="menu__image-picture"
//                   src={shoppingCart}
//                   alt=""
//                 />
//               </a>
//             </div>
//             <div className="cart__count">{cartCount}</div>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./style.css";
import logo from "./images/logo.png";
import shoppingCart from "./images/shopping-cart.png";
import * as api from "../../services/api";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from "@mui/material";
import { AccountCircle, ShoppingCart } from "@mui/icons-material";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [cartCount, setCartCount] = useState(0);
  const [shopCart, setShopCart] = useState([]);

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus");
    const storedUserName = localStorage.getItem("userName");

    if (userStatus === "loggedIn" && storedUserName) {
      setLoggedIn(true);
      setUserName(storedUserName);
    }
    updateCartCount();
  }, [shopCart]);

  function handleLogout() {
    api.handleLogout(userName, setLoggedIn, setUserName, setUserInfo);
  }

  function updateCartCount() {
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    setShopCart(storedCart);
    setCartCount(storedCart.length);
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{display: "flex", justifyContent:"space-between"}}>
          <div className="logo">
            <Link className="logo__link" to="/main">
              <img className="logo__image" src={logo} alt="" />
            </Link>
          </div>

          <div className="menu">
            {loggedIn ? (
              <>
                <Typography variant="subtitle1" className="menu__greeting">
                  Hi, {userName}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Log out
                </Button>
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
                <IconButton color="inherit">
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </a>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
