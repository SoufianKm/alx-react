import React from "react";
import logo from "../../assets/holberton-logo.jpg";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/uiActionCreators";

function Header({ user, logout }) {
  return (
    <div className={css(styles.headerContainer)}>
      <img src={logo} alt="logo" className={css(styles.imgHeader)} />
      <h1 className={css(styles.level1)}>School dashboard</h1>
      {user.isLoggedIn && (
        <div className={css(styles.logoutSection)}>
          <p>
            Welcome, {user.email} (
            <a href="#" onClick={logout}>
              Logout
            </a>
            )
          </p>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
  logout: PropTypes.func.isRequired,
};

Header.defaultProps = {
  user: { email: "", isLoggedIn: false },
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgHeader: {
    width: "20%",
    "@media (max-width:414px)": {
      width: "60%",
    },
    "@media (min-width:415px) and (max-width:900px)": {
      width: "30%",
    },
  },
  level1: {
    color: "#e0354b",
    fontSize: "2.6rem",
    "@media (max-width:414px)": {
      fontSize: "1.6rem",
    },
    "@media (min-width:415px) and (max-width:900px)": {
      fontSize: "2rem",
    },
  },
  logoutSection: {
    textAlign: "right",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.get("user"), // Assuming user info is stored under "user"
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
