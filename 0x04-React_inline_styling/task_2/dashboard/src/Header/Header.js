import React from "react";
import logo from "../../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";

function Header() {
  return (
    <>
      <img src={logo} alt="logo" className={css(styles.imgHeader)} />
      <h1 className={css(styles.level1)}>School dashboard</h1>
    </>
  );
}

const styles = StyleSheet.create({
  imgHeader: {
    width: "20%",
  },
  level1: {
    color: "#e0354b",
    fontSize: "2.6rem",
  },
});

export default Header;
