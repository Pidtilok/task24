const usersUrl = "https://634e9f834af5fdff3a625f84.mockapi.io/users";

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

export function handleSignIn(email, password, setError, setLoggedIn, setUserName) {
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
              window.location.href = "./main";
            })
            .catch((error) => console.error(error));
        }
      }
    })
    .catch((error) => console.error(error));
}

export function handleRegistration(
  name,
  email,
  password,
  verify,
  setError
) {
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
            window.location.href = "./main";
          })
          .catch((error) => console.error(error));
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





