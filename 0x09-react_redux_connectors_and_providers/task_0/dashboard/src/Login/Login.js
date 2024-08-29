import React from "react";
import { StyleSheet, css } from "aphrodite";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      enableSubmit: true,
    };
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    this.props.logIn(this.state.email, this.state.password);
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value }), this.componentDidUpdate;
  };

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value }, this.componentDidUpdate);
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.email !== prevState.email ||
      this.state.password !== prevState.password
    ) {
      if (this.state.email !== "" && this.state.password !== "") {
        this.setState({ enableSubmit: true });
      } else {
        if (this.state.enableSubmit !== false) {
          this.setState({ enableSubmit: false });
        }
      }
    }
  }

  render() {
    return (
      <div className={css(styles.AppBody)}>
        <p>Login to access the full dashboard</p>
        <form
          className={css(styles.AppBodyForm, styles.small)}
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email" className={css(styles.AppBodyLabel)}>
            Email
          </label>
          <input
            type="email"
            name="email"
            className={css(styles.AppBodyInput)}
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password" className={css(styles.AppBodyLabel)}>
            Password
          </label>
          <input
            type="password"
            name="password"
            className={css(styles.AppBodyInput)}
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <input
            type="submit"
            className={css(styles.AppBodyButton)}
            value="OK"
            disabled={this.state.enableSubmit}
          />
        </form>
      </div>
    );
  }
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
