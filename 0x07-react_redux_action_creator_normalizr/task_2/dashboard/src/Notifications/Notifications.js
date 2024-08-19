import React, { PureComponent } from "react";
import close from "../../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  markNotificationAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const show = css(this.props.displayDrawer ? styles.showOff : styles.showOn);
    return (
      <React.Fragment>
        {this.props.displayDrawer ? (
          <div className={css(styles.flexArea)}>
            <div className={(css(styles.menuItem), show)}>
              <p>Your notifications</p>
            </div>
            <div className={css(styles.Notifications)}>
              <button
                className={css(styles.button)}
                aria-label="Close"
                onClick={() => {
                  console.log("Close button has been clicked");
                  this.props.handleHideDrawer();
                }}
              >
                <img src={close} alt="close" className={css(styles.img)} />
              </button>

              {this.props.listNotifications &&
              this.props.listNotifications.length > 0 ? (
                <>
                  <p>Here is the list of notifications</p>
                  <ul className={css(styles.ul)}>
                    {this.props.listNotifications.map(
                      ({ id, html, type, value }) => (
                        <NotificationItem
                          key={id}
                          type={type}
                          value={value}
                          html={html}
                          markNotificationAsRead={this.markNotificationAsRead}
                          id={id}
                        />
                      )
                    )}
                  </ul>
                </>
              ) : (
                <p>No new notification for now</p>
              )}
            </div>
          </div>
        ) : (
          <div className={css(styles.flexArea)}>
            <div
              className={css(styles.menuItem)}
              onClick={this.props.handleDisplayDrawer}
            >
              <p>Your notifications</p>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleHideDrawer: () => {},
  handleDisplayDrawer: () => {},
  markNotificationAsRead: () => {},
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleHideDrawer: PropTypes.func,
  handleDisplayDrawer: PropTypes.func,
  markNotificationAsRead: () => {},
};

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },

  to: {
    opacity: 1,
  },
};

const translateKeyframes = {
  "0%": {
    transform: "translateY(0)",
  },

  "50%": {
    transform: "translateY(-5px)",
  },

  "75%": {
    transform: "translateY(5px)",
  },

  "100%": {
    transform: "translateY(0px)",
  },
};

const styles = StyleSheet.create({
  menuItem: {
    textAlign: "right",
    cursor: "pointer",
    background: "#fff8f8",
    width: "fitContent",
    float: "right",
    ":hover": {
      animationName: [opacityKeyframes, translateKeyframes],
      animationDuration: "1s, 0.5s",
      animationIterationCount: 3,
    },
  },
  flexArea: {
    position: "absolute",
    width: "35%",
    right: "0",
    top: "0",
    marginRight: "1rem",
    "@media (max-width:900px)": {
      width: "100%",
      right: "0",
      top: "0",
      marginRight: "0.3rem",
    },
  },
  Notifications: {
    marginTop: "1rem",
    padding: "0.5rem",
    border: "2px dashed #e0354b",
    "@media (max-width:900px)": {
      padding: "0px",
      border: "0px dashed rgb(224, 53, 75)",
      position: "fixed",
      width: "100% ",
      height: "100%",
      background: "white",
      top: "0px",
      left: "0px",
      fontSize: "20px",
    },
  },
  button: {
    float: "right",
    border: "none",
    padding: 0,
    background: "transparent",
  },
  img: {
    width: "20px",
  },
  ul: {
    "@media (max-width: 767px)": {
      listStyle: "none",
      padding: "0px",
    },
  },
  showOff: {
    display: "none",
  },
  showOn: {
    display: "block",
  },
});

export default Notifications;
