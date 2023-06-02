import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function AdminNav() {
  return (
    <Navbar bg="dark" variant="light">
        <Container>
          <Navbar.Brand><Link to="/" style={{color:"white", textDecoration:"none"}}>Get buss</Link></Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link ><Link to="#" style={{color:"white", textDecoration:"none"}}>Welcome to Admin Portal </Link></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default AdminNav