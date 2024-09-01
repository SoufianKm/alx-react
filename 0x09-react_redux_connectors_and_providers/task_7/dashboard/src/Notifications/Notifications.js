import React, { PureComponent } from "react";
import close from "../../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import {
  fetchNotifications,
  setLoadingState,
  markAsRead,
} from "../../actions/notificationActionCreators";
import { getUnreadNotifications } from "../../selectors/notificationSelectors";

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  componentDidMount() {
    this.props.setLoadingState(true);
    this.props.fetchNotifications();
  }

  markNotificationAsRead(id) {
    this.props.markAsRead(id);
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
          <div
            className={css(styles.menuItem)}
            onClick={this.props.handleDisplayDrawer}
          >
            <p>Your notifications</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  Notifications: {
    border: "2px dashed red",
    padding: "1rem",
    width: "100%",
    position: "absolute",
    right: 0,
    marginRight: "1rem",
    background: "white",
    zIndex: 10,
  },
  menuItem: {
    textAlign: "end",
    marginRight: "1rem",
  },
  ul: {
    margin: 0,
  },
  button: {
    border: "none",
    background: "transparent",
    position: "absolute",
    right: "1rem",
    top: "1rem",
  },
  img: {
    width: "15px",
    height: "15px",
  },
  flexArea: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  showOn: {
    animationName: [
      {
        "0%": {
          transform: "translateY(0px)",
        },
        "100%": {
          transform: "translateY(-100px)",
        },
      },
    ],
    animationDuration: "1s, 0.5s",
    animationIterationCount: "infinite",
  },
  showOff: {
    animationName: [
      {
        "0%": {
          transform: "translateY(-100px)",
        },
        "100%": {
          transform: "translateY(0px)",
        },
      },
    ],
    animationDuration: "1s, 0.5s",
    animationIterationCount: "infinite",
  },
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  fetchNotifications: PropTypes.func,
  setLoadingState: PropTypes.func,
  markAsRead: PropTypes.func, // Added markAsRead to prop types
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  fetchNotifications: () => {},
  setLoadingState: () => {},
  markAsRead: () => {}, // Default to empty function
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
};

const mapStateToProps = (state) => {
  return {
    listNotifications: getUnreadNotifications(state), // Using the selector here
  };
};

export const mapDispatchToProps = {
  fetchNotifications,
  setLoadingState,
  markAsRead, // Add markAsRead here
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
