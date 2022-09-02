import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import images from "../../constants/images";
import "./Navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navigateToAuth = () => {
    navigate("/login");
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  const navigateToBook = () => {
    navigate("/book");
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  var firstName = user?.result.name.split(" ");

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.gericht} alt="app logo" />
      </div>
      <ul className="app__navbar-links">
        <li className="p__header">
          <a href="#home">Home</a>
        </li>
        <li className="p__header">
          <a href="#about">About</a>
        </li>
        <li className="p__header">
          <a href="#menu">Menu</a>
        </li>
        <li className="p__header">
          <a href="#awards">Awards</a>
        </li>
        <li className="p__header">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      {user ? (
        <div className="app__navbar-login">
          <p className="p__cormorant" style={{ marginBottom: "0" }}>
            Hi, {firstName[0]}{" "}
          </p>
          <div />
          <button
            type="button"
            className="openModalBtn"
            onClick={navigateToBook}
          >
            Book Table
          </button>
          <div />
          <button type="button" className="openModalBtn" onClick={logout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="app__navbar-login">
          <button
            type="button"
            className="openModalBtn"
            onClick={navigateToAuth}
          >
            Sign Up / Sign In
          </button>
        </div>
      )}
      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu
          color="#fff"
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen-links">
              <li className="p__opensans">
                <a href="#home">Home</a>
              </li>
              <li className="p__opensans">
                <a href="#about">About</a>
              </li>
              <li className="p__opensans">
                <a href="#menu">Menu</a>
              </li>
              <li className="p__opensans">
                <a href="#awards">Awards</a>
              </li>
              <li className="p__opensans">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// {user.result.name}
