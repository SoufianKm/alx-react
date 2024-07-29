import logo from "../assets/holberton-logo.jpg";
import "./Header.css";
import React from "react";

function Header() {
  return (
    <>
      <img src={logo} alt="logo" />
      <h1>School dashboard</h1>
    </>
  );
}

export default Header;
