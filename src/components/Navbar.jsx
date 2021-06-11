import React from "react";
import PropTypes from "prop-types";

export const Navbar = (props) => {
  return (
    <header>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              {props.brand}
            </a>
          </div>
          <button
            type="button"
            className="btn btn-default navbar-btn navbar-right"
          >
            {props.signInText ? props.signInText : "Sign In"}
          </button>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  brand: PropTypes.string.isRequired,
  signInText: PropTypes.string,
};
