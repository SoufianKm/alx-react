// NotificationsContainer.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Notifications from "./Notifications";
import {
  fetchNotifications,
  setLoadingState,
} from "../../actions/notificationActionCreators";

const NotificationsContainer = ({
  fetchNotifications,
  setLoadingState,
  ...props
}) => {
  useEffect(() => {
    setLoadingState(true);
    fetchNotifications();
  }, [fetchNotifications, setLoadingState]);

  return <Notifications {...props} />;
};

const mapDispatchToProps = {
  fetchNotifications,
  setLoadingState,
};

export default connect(null, mapDispatchToProps)(NotificationsContainer);
