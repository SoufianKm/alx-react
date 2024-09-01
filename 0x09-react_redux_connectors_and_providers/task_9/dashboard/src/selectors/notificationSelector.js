import { createSelector } from "reselect";

export const filterTypeSelected = (state) => state.get("filter");

export const getNotifications = (state) => state.get("notifications");

// New selector to get unread notifications by type
export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filterType) => {
    // Filter notifications based on read status and filter type
    return notifications.filter((notification) => {
      const isRead = notification.get("isRead");
      const isUrgent = notification.get("type") === "urgent";

      if (filterType === "default") {
        return !isRead; // Return all unread notifications
      } else if (filterType === "urgent") {
        return !isRead && isUrgent; // Return unread and urgent notifications
      }
      return false; // No other filters are handled
    });
  }
);

// Removed old selector
// export const getUnreadNotifications = createSelector(
//   [getNotifications],
//   (notifications) =>
//     notifications.filter((notification) => !notification.get("isRead"))
// );
