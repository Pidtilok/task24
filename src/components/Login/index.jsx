// import React, { useState, useEffect } from "react";
// import "./style.css";
// import * as api from '../../services/api';


// export default function Login() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [userInfo, setUserInfo] = useState(null);
//   const [email, setEmail] = useState("");
//   const [regEmail, setRegEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [regPassword, setRegPassword] = useState("");
//   const [error, setError] = useState("");
//   const [verify, setVerify] = useState("");


//   useEffect(() => {
//     const userStatus = localStorage.getItem("userStatus");
//     const storedUserName = localStorage.getItem("userName");
//     if (userStatus === "loggedIn" && storedUserName) {
//       setLoggedIn(true);
//       setUserName(storedUserName);
//     }
//   }, []);


//   function handleLogout() {
//     api.handleLogout(userName, setLoggedIn, setUserName, setUserInfo);
//   }

//   function handleSignIn(event) {
//     event.preventDefault();
//     api.handleSignIn(email, password, setError, setLoggedIn, setUserName);
//   } 

//   function handleRegistration(event) {
//     event.preventDefault();
//     api.handleRegistration(name, regEmail, regPassword, verify, setError);
//   }

  

//   return (
//     <div>
//       <div className="containerSing">
//         <div className="sing">
//           <h1 className="title">Secure Sign In</h1>
//           <p className="sing__description">For current customers</p>
//           <form className="login-form" onSubmit={handleSignIn}>
//             <div className="error">{error}</div>
//             <div>
//               <label htmlFor="email"></label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="Email Address"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password"></label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="Password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button type="submit" className="submit">
//               Sign in
//             </button>
//           </form>
//         </div>

//         <div className="registr">
//           <h1 className="title">Quick Registration</h1>
//           <p className="registr__description">For new customers</p>
//           <form className="registr__form" onSubmit={handleRegistration}>
//             <div className="error">{error}</div>
//             <div>
//               <label htmlFor="name"></label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Full name"
//                 required
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="verifyEmail"></label>
//               <input
//                 type="email"
//                 id="verifyEmail"
//                 name="email"
//                 placeholder="Email Address"
//                 required
//                 value={regEmail}
//                 onChange={(e) => setRegEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="verifyPassword"></label>
//               <input
//                 type="password"
//                 id="verifyPassword"
//                 name="password"
//                 placeholder="Password"
//                 required
//                 value={regPassword}
//                 onChange={(e) => setRegPassword(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="verify"></label>
//               <input
//                 type="password"
//                 id="verify"
//                 placeholder="Verify Password"
//                 required
//                 value={verify}
//                 onChange={(e) => setVerify(e.target.value)}
//               />
//             </div>
//             <button type="submit">Create Account</button>
//           </form>
//         </div>
//       </div>

//       {loggedIn && userInfo && (
//         <div className="info__item">
//           <div className="info__name">Name: {userInfo.name}</div>
//           <div className="info__email">Email: {userInfo.email}</div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button, Grid } from "@mui/material";
import * as api from '../../services/api';

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [error, setError] = useState("");
  const [verify, setVerify] = useState("");

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

  function handleSignIn(event) {
    event.preventDefault();
    api.handleSignIn(email, password, setError, setLoggedIn, setUserName);
  }

  function handleRegistration(event) {
    event.preventDefault();
    api.handleRegistration(name, regEmail, regPassword, verify, setError);
  }

  return (
    <div>
      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <div className="sing">
              <Typography variant="h4" className="title">
                Secure Sign In
              </Typography>
              <Typography variant="subtitle1" className="sing__description">
                For current customers
              </Typography>
              <form className="login-form" onSubmit={handleSignIn}>
                <div className="error">{error}</div>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  name="email"
                  label="Email Address"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="password"
                  id="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" className="submit">
                  Sign in
                </Button>
              </form>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="registr">
              <Typography variant="h4" className="title">
                Quick Registration
              </Typography>
              <Typography variant="subtitle1" className="registr__description">
                For new customers
              </Typography>
              <form className="registr__form" onSubmit={handleRegistration}>
                <div className="error">{error}</div>
                <TextField
                  fullWidth
                  type="text"
                  id="name"
                  label="Full name"
                  placeholder="Full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="email"
                  id="verifyEmail"
                  name="email"
                  label="Email Address"
                  placeholder="Email Address"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="password"
                  id="verifyPassword"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="password"
                  id="verify"
                  label="Verify Password"
                  placeholder="Verify Password"
                  required
                  value={verify}
                  onChange={(e) => setVerify(e.target.value)}
                />
                <Button type="submit">Create Account</Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>

      {loggedIn && userInfo && (
        <div className="info__item">
          <div className="info__name">Name: {userInfo.name}</div>
          <div className="info__email">Email: {userInfo.email}</div>
        </div>
      )}
    </div>
  );
}