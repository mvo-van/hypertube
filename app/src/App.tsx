import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import Test from './pages/test/Test';
import "./palette/colors.css";

function App() {
  return(
      <BrowserRouter>
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Amatic+SC" />
          <Routes>
            <Route path='/test' element={<Test />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App;
