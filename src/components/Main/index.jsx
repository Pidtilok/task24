// import React, { useState, useEffect } from "react";
// import "./style.css";
// import greenImage from "./Images/products/green.jpeg";
// import shoppingCartImage from "./Images/products/shopping-cart.png";
// import { fetchProducts } from "../../services/api";
// import { addToCart, removeFromCart } from "../../services/api";

// const Main = () => {
//   const [products, setProducts] = useState([]);
//   const [shoppingCart, setShoppingCart] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     fetchData();
//     const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
//     setShoppingCart(storedCart);
//     setCartCount(storedCart.length);
//   }, []);


//   const fetchData = async () => {
//     const data = await fetchProducts();
//     setProducts(data);
//   };


//   const importAll = (r) => r.keys().map(r);
//   const images = importAll(
//     require.context("./Images/products", false, /\.(png|jpe?g|svg)$/)
//   );

//   const handleCartClick = async (productId) => {
//     const index = shoppingCart.findIndex((item) => item.id === productId);
//     const updatedCart = [...shoppingCart];

//     if (index === -1) {
//       const product = products.find((item) => item.id === productId);
//       if (product) {
//         const cartItem = { id: product.id, ...product };
//         updatedCart.push(cartItem);
//         setCartCount(updatedCart.length);

//         const userStatus = localStorage.getItem("userStatus");
//         const storedUserName = localStorage.getItem("userName");
//         if (userStatus === "loggedIn" && storedUserName) {
//           try {
//             await addToCart(storedUserName, cartItem);
//           } catch (error) {
//             console.error(error);
//           }
//         }
//       }
//     } else {
//       updatedCart.splice(index, 1);
//       setCartCount(updatedCart.length);

//       const userStatus = localStorage.getItem("userStatus");
//       const storedUserName = localStorage.getItem("userName");
//       if (userStatus === "loggedIn" && storedUserName) {
//         try {
//           await removeFromCart(storedUserName, productId);
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     }

//     setShoppingCart(updatedCart);
//     localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
//   };

//   const renderCategories = () => {
//     const categories = [
//       ...new Set(products.map((product) => product.category)),
//     ];

//     return categories.map((category) => {
//       const categoryProducts = products.filter(
//         (product) => product.category === category
//       );

//       return (
//         <section key={category} className="category" data-name={category}>
//           <h2>{category}</h2>
//           <div className="category__container">
//             {renderProducts(categoryProducts)}
//           </div>
//         </section>
//       );
//     });
//   };

//   const renderProducts = (categoryProducts) => {
//     return categoryProducts.map((product) => (
//       <div key={product.id} className="category__product">
//         <img
//           className="category__product-image"
//           src={images.find((image) => image.includes(product.img))}
//           alt={product.name}
//         />
//         <h3 className="category__product-name">{product.title}</h3>
//         <img
//           className={`category__product-shopCar ${
//             shoppingCart.some((item) => item.id === product.id)
//               ? "product__cart-in"
//               : ""
//           }`}
//           src={
//             shoppingCart.some((item) => item.id === product.id)
//               ? greenImage
//               : shoppingCartImage
//           }
//           alt="Shopping Cart"
//           onClick={() => handleCartClick(product.id)}
//         />
//         <span className="category__product-price">${product.price}</span>
//         <div className="category__product-price-container">
//           {product.sale && (
//             <>
//               <span className="category__product-sale-price">
//                 ${product.price - product.price * (product.salePercent / 100)}
//               </span>
//               <div className="category__product-sale-badge">
//                 -{product.salePercent}%
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     ));
//   };

//   return (
//       <div id="categoriesContainer">
//         {renderCategories()}
//       </div>
//   );
// };

// export default Main;


import React, { useState, useEffect } from "react";
import { Typography, Grid, Box, Card, CardMedia, CardContent, Button, hexToRgb } from "@mui/material";
import { fetchProducts } from "../../services/api";
import { addToCart, removeFromCart } from "../../services/api";
import greenImage from "./Images/products/green.jpeg";
import shoppingCartImage from "./Images/products/shopping-cart.png";

const Main = () => {
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchData();
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    setShoppingCart(storedCart);
    setCartCount(storedCart.length);
  }, []);

  const fetchData = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const importAll = (r) => r.keys().map(r);
  const images = importAll(require.context("./Images/products", false, /\.(png|jpe?g|svg)$/));

  const handleCartClick = async (productId) => {
    const index = shoppingCart.findIndex((item) => item.id === productId);
    const updatedCart = [...shoppingCart];

    if (index === -1) {
      const product = products.find((item) => item.id === productId);
      if (product) {
        const cartItem = { id: product.id, ...product };
        updatedCart.push(cartItem);
        setCartCount(updatedCart.length);

        const userStatus = localStorage.getItem("userStatus");
        const storedUserName = localStorage.getItem("userName");
        if (userStatus === "loggedIn" && storedUserName) {
          try {
            await addToCart(storedUserName, cartItem);
          } catch (error) {
            console.error(error);
          }
        }
      }
    } else {
      updatedCart.splice(index, 1);
      setCartCount(updatedCart.length);

      const userStatus = localStorage.getItem("userStatus");
      const storedUserName = localStorage.getItem("userName");
      if (userStatus === "loggedIn" && storedUserName) {
        try {
          await removeFromCart(storedUserName, productId);
        } catch (error) {
          console.error(error);
        }
      }
    }

    setShoppingCart(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const renderCategories = () => {
    const categories = [...new Set(products.map((product) => product.category))];

    return categories.map((category) => {
      const categoryProducts = products.filter((product) => product.category === category);

      return (
        <Box key={category} component="section" className="category" data-name={category}>
          <Typography variant="h2">{category}</Typography>
          <Grid container spacing={2} className="category__container">
            {renderProducts(categoryProducts)}
          </Grid>
        </Box>
      );
    });
  };

  const renderProducts = (categoryProducts) => {
    return categoryProducts.map((product) => (
      <Grid item key={product.id} xs={12} sm={6} md={4}>
        <Card className="category__product">
          <CardMedia
            component="img"
            className="category__product-image"
            src={images.find((image) => image.includes(product.img))}
            alt={product.name}
            style={{width: "200px", height: "200px", paddingLeft: "100px"}}
          />
            <Typography variant="h6" className="category__product-name">
              {product.title}
            </Typography>
          <CardContent style={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant="body1" 
                        className="category__product-price" 
                        style={{display: "flex", flexDirection: "row", padding: "5px"}}>
              ${product.price}
              <div className="category__product-price-container">
              {product.sale && (
                <>
                  <Typography variant="body1" className="category__product-sale-price" style={{paddingLeft: "5px"}}>
                    ${product.price - product.price * (product.salePercent / 100)}
                  </Typography>
                  <div className="category__product-sale-badge">-{product.salePercent}% </div>
                </>
              )}
            </div>
            </Typography>
            <Button
              className={`category__product-shopCar ${
                shoppingCart.some((item) => item.id === product.id) ? "product__cart-in" : ""
              }`}
              onClick={() => handleCartClick(product.id)}
            >
              <img
                src={
                  shoppingCart.some((item) => item.id === product.id)
                    ? greenImage
                    : shoppingCartImage
                }
                alt="Shopping Cart"
                style={{ width: "40px", height: "40px", background: "red", padding: "1px"}}
              />
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return <div id="categoriesContainer">{renderCategories()}</div>;
};

export default Main;
