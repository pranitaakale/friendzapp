import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Routes>
      <Route path='/' exact element={ <Welcome /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/signup' element={ <Signup /> } />
      <Route path='/home' element={ <Home {...null} /> } />
      <Route path='/profile' element={ <Profile {...null} /> } />
      {/* <Route path='/login' component={} /> */}
      </Routes>
    </Router>
  );
}

export default App;
