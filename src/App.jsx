import './App.css';
import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


