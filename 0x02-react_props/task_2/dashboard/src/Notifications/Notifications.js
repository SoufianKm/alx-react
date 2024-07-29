import React from "react";
import { getLatestNotification } from "../utils/utils";
import "./Notifications.css";
import close from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";

function Notifications() {
  return (
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
      <p>Here is the list of notifications</p>
      <ul>
        <NotificationItem type="default" value="New course available" />
        <NotificationItem type="urgent" value="New resume available" />
        <NotificationItem type="urgent" html={getLatestNotification()} />
      </ul>
    </div>
  );
}

export default Notifications;
