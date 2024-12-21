import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import isAuthenticated from "../../auth";
import { useNavigate } from "react-router-dom";
import busalogo from "../../assets/images/busalogo.png";

const MyNavbar = () => {
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  // Authentication state
  const isAuthenticatedUser = isAuthenticated();

  // State for playerId input
  const [playerId, setPlayerId] = useState("");

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={busalogo}
            alt="Profile Preview"
            style={{
              width: "50px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/Teams">Teams</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            {isAuthenticatedUser ? (
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
                <Nav.Link href="/players">Players</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
          {isAuthenticatedUser && (
            <Form className="d-flex">
              <FormControl
                type="search"
                className="me-2"
                aria-label="Search"
                placeholder="Player ID"
                name="playerId"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate(`/players_details/${playerId}`);
                  }
                }}
              />
              <Button
                variant="outline-success"
                onClick={() => navigate(`/players_details/${playerId}`)}
                disabled={!playerId}
              >
                Search
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
