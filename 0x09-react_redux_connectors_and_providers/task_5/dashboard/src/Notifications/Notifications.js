import React, { PureComponent } from "react";
import close from "../../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import { fetchNotifications } from "../../actions/notificationActionCreators";

class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);
  }

  componentDidMount() {
    this.props.fetchNotifications();
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
  handleHideDrawer: PropTypes.func,
  handleDisplayDrawer: PropTypes.func,
  fetchNotifications: PropTypes.func.isRequired, // Added this line
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleHideDrawer: PropTypes.func,
  handleDisplayDrawer: PropTypes.func,
};

const mapStateToProps = (state) => ({
  listNotifications: state.notifications.get("messages").toJS(), // Updated this line
});

const mapDispatchToProps = {
  fetchNotifications,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
