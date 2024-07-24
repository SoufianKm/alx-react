import React from "react";
import "./Notifications.css";
import close from "./close-icon.png";
import { getLatestNotification } from "./utils";

export default function Notifications() {
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li
          data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}
        ></li>
      </ul>
    </div>
  );
}
