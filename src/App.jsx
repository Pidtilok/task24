import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/hoc/PrivateRoute';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
          {/* <Route path="/main" element={<Main />} /> */}
          <Route path="/main" element={
            <PrivateRoute isAuth={loggedIn}>
              <Main />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;