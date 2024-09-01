// Notifications.js
import React from "react";
import close from "../../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import {
  markAsRead,
  setNotificationFilter,
} from "../../actions/notificationActionCreators";
import { getUnreadNotificationsByType } from "../../selectors/notificationSelector";

const Notifications = (props) => {
  const markNotificationAsRead = (id) => {
    props.markAsRead(id);
    console.log(`Notification ${id} has been marked as read`);
  };

  const handleFilterChange = (filter) => {
    props.setNotificationFilter(filter);
  };

  const show = css(props.displayDrawer ? styles.showOff : styles.showOn);

  return (
    <React.Fragment>
      {props.displayDrawer ? (
        <div className={css(styles.flexArea)}>
          <div className={css(styles.menuItem, show)}>
            <p>Your notifications</p>
          </div>
          <div className={css(styles.Notifications)}>
            <button
              className={css(styles.button)}
              aria-label="Close"
              onClick={() => {
                console.log("Close button has been clicked");
                props.handleHideDrawer();
              }}
            >
              <img src={close} alt="close" className={css(styles.img)} />
            </button>

            {props.listNotifications && props.listNotifications.length > 0 ? (
              <>
                <p>Here is the list of notifications</p>
                <div>
                  <button onClick={() => handleFilterChange("urgent")}>
                    ‼️
                  </button>
                  <button onClick={() => handleFilterChange("default")}>
                    💠
                  </button>
                </div>
                <ul className={css(styles.ul)}>
                  {props.listNotifications.map(({ id, html, type, value }) => (
                    <NotificationItem
                      key={id}
                      type={type}
                      value={value}
                      html={html}
                      markNotificationAsRead={markNotificationAsRead}
                      id={id}
                    />
                  ))}
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
          onClick={props.handleDisplayDrawer}
        >
          <p>Your notifications</p>
        </div>
      )}
    </React.Fragment>
  );
};

// Styles and PropTypes remain unchanged

export default Notifications;
