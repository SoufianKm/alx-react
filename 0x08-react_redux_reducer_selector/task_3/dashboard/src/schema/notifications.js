import notificationsData from "../../notifications.json";
import { normalize, schema } from "normalizr";

const user = new schema.Entity("users");
const message = new schema.Entity("messages", {}, { idAttribute: "guid" });
const notification = new schema.Entity("notification", {
  author: user,
  context: message,
});

const normalized = normalize(notificationsData, [notification]);

export function getAllNotificationsByUser(userId) {
  const notifications = normalized.entities.notification;
  const messages = normalized.entities.messages;
  const userNotifications = [];

  for (const id in notifications) {
    if (notifications[id].author === userId) {
      userNotifications.push(messages[notifications[id].context]);
    }
  }

  return userNotifications;
}

export { normalized };
