import React from 'react'
import Main from '../components/Main';
import Login from './Login';


import {
    BrowserRouter as Router,
    Routes, Route,
  } from "react-router-dom";
import Register from './Register';

const Pages = () => {
  return (
    <Router>
<Routes>
  
    <Route exact path="/" element={<Main/>}/>

    <Route exact path="/login" element={<Login/>}/>
    
    <Route exact path="/register" element={<Register/>}/>
  </Routes>
</Router>
  )
}

export default Pages