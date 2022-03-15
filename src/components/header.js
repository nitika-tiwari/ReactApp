import React from "react";
import Navbar from './';
import logo from '../logo.svg';
import { Container, Row, Col, Button } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Blogs from './pages/blogs';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Dashboard from './pages/dashboard/';
import Logout from './pages/dashboard/logout';
const Header = () => {
  const storedJwt = localStorage.getItem('token');
      console.log(storedJwt);
      // if(!storedJwt) {
      //   return <SignIn/>
      // }
    return (
      <Router>
      <div className="header">
      <Container className="header-section">
      <div className="logo">
      <img src={logo} width="100" height="100" />
      </div>
        <Navbar />
      </Container>
      </div>
        <Routes>
          <Route path='/' exact  element={<Home />} />
          <Route path='/about'  element={<About />} />
          <Route path='/blogs'  element={<Blogs />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/signIn' element={storedJwt ? <Navigate to="/dashboard" /> : <SignIn />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </Router>

    );
};
export default Header;
