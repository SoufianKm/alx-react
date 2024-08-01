import React from "react";
import "./Notifications.css";
import close from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "./NotificationItemShape";

function Notifications({ displayDrawer, listNotifications }) {
  return (
    <React.Fragment>
      {displayDrawer ? (
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

            {listNotifications && listNotifications.length > 0 ? (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {listNotifications.map(({ id, html, type, value }) => (
                    <NotificationItem
                      key={id}
                      type={type}
                      value={value}
                      html={html}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p>No new notification for now</p>
                <button
                  style={{
                    color: "#3a3a3a",
                    fontWeight: "bold",
                    background: "none",
                    border: "none",
                    fontSize: "10px",
                    position: "absolute",
                    right: "2px",
                    top: "2px",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                  onClick={console.log("Close button has been clicked")}
                >
                  <img src={close} alt="closeIcon" width="10px" />
                </button>
              </>
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

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;
