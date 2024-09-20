import React from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard';
import About from './components/About';
import Layout from './components/Layout';
function App() {
  return (
    <>
    <Router>
        <Routes>
          
          <Route path="/login" element={<Login/>}/>
            
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<Layout />}>
            
            <Route index element={<Dashboard />} />
            <Route path='/about'  index element={<About />} />
            
            
           
          </Route>
          
            
          
        </Routes>
      </Router>
    </>
  );
}

export default App;

