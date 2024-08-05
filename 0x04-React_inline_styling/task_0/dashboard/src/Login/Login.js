import React from "react";
import "./Login.css";

function Login() {
  return (
    <>
      <div className="login">
        <p>Login to access the full dashboard</p>
        <div className="login-section">
          <form>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" />
            <button>Ok</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
