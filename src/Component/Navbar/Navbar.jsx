import React from "react";
import { Link } from "react-router-dom";

function Navbar({ loginData, logOut }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href="/">
        Noxe
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {loginData ? (
          <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="movies">
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="tvshows">
                  Tv Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="people">
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="about">
                  About
                </Link>
              </li>
            </ul>
          </>
        ) : (
          ""
        )}
        <ul className="navbar-nav ms-auto">
          {loginData ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="profile">
                  Wellcome{" "}
                  {
                    loginData[
                      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                    ]
                  }
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="login">
                  LogIn
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
