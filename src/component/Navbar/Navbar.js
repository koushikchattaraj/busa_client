import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import isAuthenticated from "../../auth";
import { useNavigate } from "react-router-dom";
import busalogo from "../../assets/images/busalogo.png";

const MyNavbar = () => {
  const navigate = useNavigate();

  // State to control Navbar collapse
  const [expanded, setExpanded] = useState(false);

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  // Authentication state
  const isAuthenticatedUser = isAuthenticated();

  // State for playerId input
  const [playerId, setPlayerId] = useState("");

  const handleNavigate = (path) => {
    navigate(path);
    setExpanded(false); // Close the navbar after navigation
  };

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      className="shadow-sm"
      expanded={expanded}
    >
      <Container>
        {/* Brand Logo and Name */}
        <Navbar.Brand
          onClick={() => handleNavigate("/")}
          className="d-flex align-items-center gap-2"
          style={{ cursor: "pointer" }}
        >
          <img
            src={busalogo}
            alt="BUSA Logo"
            className="img-fluid"
            style={{
              width: "50px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <span className="fw-bold text-truncate" style={{ fontSize: "12px" }}>
            Bankura United Sports Association
          </span>
        </Navbar.Brand>

        {/* Responsive Navbar Toggle */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        {/* Navbar Collapse */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link onClick={() => handleNavigate("/teams")}>Teams</Nav.Link>
            <Nav.Link onClick={() => handleNavigate("/about")}>About</Nav.Link>
            <Nav.Link onClick={() => handleNavigate("/contact")}>
              Contact
            </Nav.Link>
            {isAuthenticatedUser ? (
              <>
                <NavDropdown title="Player Deatils" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleNavigate("/players")}>
                    Players
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleNavigate("/players_verification")}
                  >
                    Players Verification
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => handleNavigate("/login")}>
                Login
              </Nav.Link>
            )}
          </Nav>

          {isAuthenticatedUser && (
            <Form className="d-flex ms-3">
              <FormControl
                type="search"
                placeholder="Player ID"
                className="me-2"
                aria-label="Search Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    navigate(`/players_details/${playerId}`);
                    setExpanded(false); // Close navbar
                  }
                }}
              />
              <Button
                variant="outline-success"
                onClick={() => {
                  navigate(`/players_details/${playerId}`);
                  setExpanded(false); // Close navbar
                }}
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
