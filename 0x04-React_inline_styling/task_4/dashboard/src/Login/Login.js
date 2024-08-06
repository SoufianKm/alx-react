import React from "react";
import { StyleSheet, css } from "aphrodite";

function Login() {
  return (
    <>
      <div className={css(styles.login)}>
        <p>Login to access the full dashboard</p>
        <form className={css(styles.loginSection)}>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
          <button>Ok</button>
        </form>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  login: {
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  loginSection: {
    display: "inline-flex",
    gap: "1rem",
    "@media (max-width:767px)": {
      display: "grid",
      justifyItems: "start",
      gridTemplateColumns: "1fr 3fr",
    },
  },
});

export default Login;
