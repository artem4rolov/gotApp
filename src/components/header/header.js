import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <h3 className="header-title">
        <NavLink to="/">Game of Thrones DB</NavLink>
      </h3>
      <ul className="header-list">
        <li>
          <NavLink to="/characters">Characters</NavLink>
        </li>
        <li>
          <NavLink to="/houses">Houses</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
