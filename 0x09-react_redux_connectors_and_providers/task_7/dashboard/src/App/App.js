import React, { Component } from "react";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import CourseList from "../CourseList/CourseList";
import PropTypes from "prop-types";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { StyleSheet, css } from "aphrodite";
import { AppContext } from "./AppContext";
import { connect } from "react-redux";
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginRequest,
} from "../actions/uiActionCreators";

class App extends Component {
  listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
  ];

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {};
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === "h") {
      alert("Logging you out");
      this.props.logOut(); // This will be provided via context or from parent component
    }
  };

  render() {
    const {
      displayDrawer,
      isLoggedIn,
      displayNotificationDrawer,
      hideNotificationDrawer,
      login,
    } = this.props;

    return (
      <AppContext.Provider
        value={{ currentUser: this.state.user, logOut: this.props.logOut }}
      >
        <Notifications
          displayDrawer={displayDrawer}
          handleDisplayDrawer={displayNotificationDrawer}
          handleHideDrawer={hideNotificationDrawer}
        />
        <div className={css(styles.app)}>
          <div className={css(styles.appHeader)}>
            <Header />
          </div>
          <div className={css(styles.appBody)}>
            {isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={this.listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login logIn={login} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the school">
              <p className={css(styles.p)}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis at tempora odio, necessitatibus repudiandae
                reiciendis cum nemo sed asperiores ut molestiae eaque aliquam
                illo ipsa iste vero dolor voluptates.
              </p>
            </BodySection>
          </div>
          <div className={css(styles.appFooter)}>
            <Footer />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func.isRequired,
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
};

const styles = StyleSheet.create({
  app: { textAlign: "center" },
  appBody: {
    minHeight: "100vh",
    margin: "3rem",
    "@media (max-width: 767px)": {
      minHeight: "50vh",
    },
  },
  appFooter: {
    borderTop: "5px solid #e0354b",
    display: "flex",
    justifyContent: "center",
    fontStyle: "italic",
  },
  appHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "transparent",
    borderBottom: "5px solid #e0354b",
  },
  p: {
    textAlign: "left",
    marginTop: "0px",
  },
});

export const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get("isUserLoggedIn"),
  displayDrawer: state.ui.get("isNotificationDrawerVisible"),
});

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login: loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
