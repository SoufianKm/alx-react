import { fromJS } from "immutable"; // Import fromJS from Immutable.js
import notificationsData from "../../dist/notifications.json";
import { normalize, schema } from "normalizr";

// Define schemas (same as before)
const user = new schema.Entity("users", { idAttribute: "id" });
const message = new schema.Entity("messages", { idAttribute: "guid" });
const notification = new schema.Entity(
  "notifications",
  {
    author: user,
    context: message,
  },
  { idAttribute: "id" }
);

// Normalization function
export const notificationsNormalizer = (data) => {
  const normalizedData = normalize(data, [notification]);
  return fromJS(normalizedData.entities.notifications); // Convert to Immutable List
};

const normalized = notificationsNormalizer(notificationsData); // Use normalized data

// Get all notifications by user ID (same as before)
export function getAllNotificationsByUser(userId) {
  const notifications = normalized; // Use Immutable data
  const userNotifications = notifications.filter(
    (notification) => notification.getIn(["author", "id"]) === userId
  );

  return userNotifications.toJS(); // Convert back to plain JS if needed
}

export { normalized };
