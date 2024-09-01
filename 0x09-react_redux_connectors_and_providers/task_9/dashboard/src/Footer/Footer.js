import React from "react";
import { getFooterCopy, getFullYear } from "../utils/utils";
import { connect } from "react-redux";

function Footer({ user }) {
  const footerText = user.isLoggedIn ? (
    <a href="#">Contact us</a>
  ) : (
    `Copyright ${getFullYear()} - ${getFooterCopy(false)}`
  );

  return (
    <>
      <p>{footerText}</p>
    </>
  );
}

// Step 1: Create mapStateToProps
const mapStateToProps = (state) => {
  return {
    user: state.get("user"), // Assuming the user object is stored in the Redux state
  };
};

// Step 2: Connect the Footer component to Redux
export default connect(mapStateToProps)(Footer);
