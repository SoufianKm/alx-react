import React, { Component } from "react";
import "./Notifications.css";
import close from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.displayDrawer ? (
          <div className="flex-area">
            <div className="menuItem">
              <p>Your notifications</p>
            </div>
            <div className="Notifications">
              <button
                style={{
                  float: "right",
                  border: "none",
                  padding: 0,
                  background: "transparent",
                }}
                aria-label="Close"
                onClick={() => {
                  console.log("Close button has been clicked");
                }}
              >
                <img src={close} alt="close" />
              </button>

              {this.props.listNotifications &&
              this.props.listNotifications.length > 0 ? (
                <>
                  <p>Here is the list of notifications</p>
                  <ul>
                    {this.props.listNotifications.map(
                      ({ id, html, type, value }) => (
                        <NotificationItem
                          key={id}
                          type={type}
                          value={value}
                          html={html}
                          markAsRead={this.markAsRead}
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
          <div className="flex-area">
            <div className="menuItem">
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
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
