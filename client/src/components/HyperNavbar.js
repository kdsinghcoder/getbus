import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const HyperNavbar = () => {


  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { state, dispatch } = useContext(UserContext);


  const isLogedIn = async () => {
    try {
      const res = await fetch('/isLogedIn', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!(res.status === 200)) {
        navigate('/login');
      } else {
        console.log("welcome" + data.name);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isLogedIn();
  }, []);

  if (state) {
    return (
      <Navbar bg="dark" variant="light">
        <Container>
          <Navbar.Brand><Link to="/findbuss" style={{color:"white", textDecoration:"none"}}>Get buss</Link></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link ><Link to="/findbuss" style={{color:"white", textDecoration:"none"}}>Home</Link></Nav.Link>
            <Nav.Link ><Link to="/transaction" style={{color:"white", textDecoration:"none"}}>Transaction</Link></Nav.Link>
            <Nav.Link ><Link to="/logout" style={{color:"white", textDecoration:"none"}}>Logout</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  } else {
    return (
      <Navbar bg="dark" variant="light">
        <Container>
          <Navbar.Brand><Link to="/" style={{color:"white", textDecoration:"none"}}>Get Buss</Link></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link ><Link to="/login" style={{color:"white", textDecoration:"none"}}>Login</Link></Nav.Link>
            <Nav.Link ><Link to="/signup" style={{color:"white", textDecoration:"none"}}>Signup</Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
  }

}

export default HyperNavbar