import React, { Component } from "react";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import CourseList from "../CourseList/CourseList";
import PropTypes from "prop-types";
import { getLatestNotification } from "../utils/utils";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { StyleSheet, css } from "aphrodite";
import { AppContext, user } from "./AppContext";
import { connect } from "react-redux";
import {
  displayNotificationDrawer,
  hideNotificationDrawer,
} from "../actions/uiActionCreators";

class App extends Component {
  listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
  ];

  listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: getLatestNotification() },
  ];

  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      user: user,
      listNotifications: this.listNotifications,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    if (event.ctrlKey && event.key === "h") {
      alert("Logging you out");
      this.props.logOut();
    }
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  logOut = () => {
    this.setState({ user: user });
  };

  logIn = (email, password) => {
    const currentUser = { email: email, password: password, isLoggedIn: true };
    this.setState({ user: currentUser });
  };

  markNotificationAsRead(id) {
    const Notifications = this.state.listNotifications;
    this.setState({
      listNotifications: Notifications.filter((notif) => id !== notif.id),
    });
  }

  render() {
    const currentUser = this.state.user;
    const logOut = this.logOut;
    const {
      displayDrawer,
      isLoggedIn,
      displayNotificationDrawer,
      hideNotificationDrawer,
    } = this.props;

    return (
      <AppContext.Provider value={{ currentUser, logOut }}>
        <Notifications
          listNotifications={this.listNotifications}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={displayNotificationDrawer}
          handleHideDrawer={hideNotificationDrawer}
          markNotificationAsRead={this.markNotificationAsRead}
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
                <Login logIn={this.logIn} />
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

export const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.get("isUserLoggedIn"),
    displayDrawer: state.get("isNotificationDrawerVisible"),
  };
};

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
