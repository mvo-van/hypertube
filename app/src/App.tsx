import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Test from './pages/test/Test';
import "./palette/colors.css";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Feed from './pages/feed/Feed';
import Users from './pages/users/Users';

function App() {
  return(
      <BrowserRouter>
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Amatic+SC" />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/feed' element={<Feed />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/test' element={<Test />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
