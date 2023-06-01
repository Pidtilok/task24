// const usersUrl = "https://634e9f834af5fdff3a625f84.mockapi.io/users";

const usersUrl = 'https://6454cea3a74f994b33498016.mockapi.io/Work';


export function checkLoginStatus(userName, setLoggedIn, setUserName, setUserInfo) {
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

export function handleLogout(userName, setLoggedIn, setUserName, setUserInfo) {
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
          window.location.href = "./login";
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
}

export function handleRegistration(name, regEmail, regPassword, verify, setError) {
  if (regPassword !== verify) {
    setError("Password does not match!");
    return;
  }

  fetch(`${usersUrl}?email=${regEmail}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        setError(`User with email ${regEmail} already exists!`);
      } else {
        const user = {
          name: name,
          email: regEmail,
          password: regPassword,
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
            localStorage.setItem("regEmail", regEmail);
            localStorage.setItem("regPassword", regPassword);
            window.location.href = "./main";
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));
}

export function handleSignIn(email, password, setError, setLoggedIn, setUserName) {
  fetch(`${usersUrl}?email=${email}&password=${password}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        setError("Invalid email or password");
      } else {
        const user = data[0];
        if (user.password !== password) {
          setError("Invalid email or password");
        } else {
          const storedRegEmail = localStorage.getItem("regEmail");
          const storedRegPassword = localStorage.getItem("regPassword");
          if (email !== storedRegEmail || password !== storedRegPassword) {
            setError("Please use registered email and password");
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
                window.location.href = "./main";
              })
              .catch((error) => console.error(error));
          }
        }
      }
    })
    .catch((error) => console.error(error));
}


export const fetchProducts = async () => {
  try {
    const response = await fetch(
      "https://634e9f834af5fdff3a625f84.mockapi.io/products"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}; 



export const addToCart = (userName, cartItem) => {
  return new Promise((resolve, reject) => {
    fetch(`${usersUrl}?name=${userName}`)
      .then((response) => response.json())
      .then((data) => {
        const user = data[0];
        if (user) {
          user.shoppingCart.push(cartItem);
          fetch(`${usersUrl}/${user.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          })
            .then(() => resolve())
            .catch((error) => reject(error));
        } else {
          reject(new Error(`User ${userName} not found`));
        }
      })
      .catch((error) => reject(error));
  });
};

export const removeFromCart = (userName, productId) => {
  return new Promise((resolve, reject) => {
    fetch(`${usersUrl}?name=${userName}`)
      .then((response) => response.json())
      .then((data) => {
        const user = data[0];
        if (user) {
          const cartIndex = user.shoppingCart.findIndex((item) => item.id === productId);
          if (cartIndex !== -1) {
            user.shoppingCart.splice(cartIndex, 1);
            fetch(`${usersUrl}/${user.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(user),
            })
              .then(() => resolve())
              .catch((error) => reject(error));
          } else {
            reject(new Error(`Product ${productId} not found in the cart`));
          }
        } else {
          reject(new Error(`User ${userName} not found`));
        }
      })
      .catch((error) => reject(error));
  });
};
