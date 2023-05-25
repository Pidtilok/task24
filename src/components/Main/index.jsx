import React, { useState, useEffect } from "react";
import "./style.css";
import greenImage from "./Images/products/green.jpeg";
import shoppingCartImage from "./Images/products/shopping-cart.png";
import { fetchProducts } from '../../services/api';


const Main = () => {
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchData();
    updateCartCount();
  }, []);


  const fetchData = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    setShoppingCart(storedCart);
    setCartCount(storedCart.length);
  };

  const importAll = (r) => r.keys().map(r);
  const images = importAll(
    require.context("./Images/products", false, /\.(png|jpe?g|svg)$/)
  );

  const handleCartClick = (productId) => {
    const index = shoppingCart.findIndex((item) => item.id === productId);
    const updatedCart = [...shoppingCart];

    if (index === -1) {
      const product = products.find((item) => item.id === productId);
      if (product) {
        const cartItem = { id: product.id, ...product };
        updatedCart.push(cartItem);
        setCartCount(updatedCart.length);
      }
    } else {
      updatedCart.splice(index, 1);
      setCartCount(updatedCart.length);
    }

    setShoppingCart(updatedCart);
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
  };

  const renderCategories = () => {
    const categories = [...new Set(products.map((product) => product.category))];

    return categories.map((category) => {
      const categoryProducts = products.filter(
        (product) => product.category === category
      );

      return (
        <section key={category} className="category" data-name={category}>
          <h2>{category}</h2>
          <div className="category__container">
            {renderProducts(categoryProducts)}
          </div>
        </section>
      );
    });
  };

  const renderProducts = (categoryProducts) => {
    return categoryProducts.map((product) => (
      <div key={product.id} className="category__product">
        <img
          className="category__product-image"
          src={images.find((image) => image.includes(product.img))}
          alt={product.name}
        />
        <h3 className="category__product-name">{product.title}</h3>
        <img
          className={`category__product-shopCar ${shoppingCart.some(
            (item) => item.id === product.id
          ) ? "product__cart-in" : ""}`}
          src={shoppingCart.some((item) => item.id === product.id) ? greenImage : shoppingCartImage}
          alt="Shopping Cart"
          onClick={() => handleCartClick(product.id)}
        />
        <span className="category__product-price">${product.price}</span>
        <div className="category__product-price-container">
          {product.sale && (
            <>
              <span className="category__product-sale-price">
                ${product.price - product.price * (product.salePercent / 100)}
              </span>
              <div className="category__product-sale-badge">
                -{product.salePercent}%
              </div>
            </>
          )}
        </div>
      </div>
    ));
  };

  return (
    <div id="categoriesContainer">
      {renderCategories()}
      <div className="cart__count">{cartCount}</div>
      <div
        className="menu__image"
        onClick={() => {
          const userStatus = localStorage.getItem("userStatus");
          if (userStatus === "loggedIn") {
            window.location.href = "";
          } else {
            window.location.href = "";
          }
        }}
      >
      </div>
    </div>
  );
};

export default Main;