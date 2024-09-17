// Navigation.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserCheck } from "react-icons/fa";
import styled from "styled-components";
import { AuthContext } from "./AuthContext";
import logo from "../../public/img/Logo2.jpeg";

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const UserMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 10px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  background-color: #d35400;
  color: white;
  cursor: pointer;
  white-space: nowrap;
`;

const Logo = styled.img`
  height: 50px;
`;

export const Navigation = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, logout, authState } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLoginClick = () => {
    if (loggedIn) {
      setShowUserMenu(!showUserMenu);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setShowUserMenu(false);
    navigate("/login");
  };

  return (
    <NavBar id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a href="/#page-top">
            <Logo src={logo} alt="Greenshift Energy" />
          </a>
          {/* <a className="navbar-brand page-scroll" href="/#page-top">
            Greenshift Energy
          </a>{" "} */}
        </div>
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {!loggedIn && (
              <>
                <li>
                  <a href="/#features" className="page-scroll">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/#about" className="page-scroll">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#services" className="page-scroll">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/#portfolio" className="page-scroll">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="/#testimonials" className="page-scroll">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="/#team" className="page-scroll">
                    Team
                  </a>
                </li>
                <li>
                  <a href="/#contact" className="page-scroll">
                    Contact
                  </a>
                </li>
              </>
            )}
            {loggedIn && (
              <>
                <li>
                  <a
                    className="page-scroll"
                    onClick={() => navigate("/price-details")}
                  >
                    Generate Price
                  </a>
                </li>
                {authState.role === "admin" && (
                  <>
                    <li>
                      <a
                        className="page-scroll"
                        onClick={() => navigate("/leads-dashboard")}
                      >
                        Leads Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className="page-scroll"
                        onClick={() => navigate("/items-dashboard")}
                      >
                        Items Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className="page-scroll"
                        onClick={() => navigate("/users-dashboard")}
                      >
                        Users Dashboard
                      </a>
                    </li>
                  </>
                )}
              </>
            )}
            <li>
              <a onClick={handleLoginClick} style={{ cursor: "pointer" }}>
                {loggedIn ? <FaUserCheck /> : <FaUser />}
              </a>
              {loggedIn && (
                <UserMenu show={showUserMenu}>
                  <p>{authState.username}</p>
                  <Button onClick={handleLogout}>Log Out</Button>
                </UserMenu>
              )}
            </li>
          </ul>
        </div>
      </div>
    </NavBar>
  );
};
