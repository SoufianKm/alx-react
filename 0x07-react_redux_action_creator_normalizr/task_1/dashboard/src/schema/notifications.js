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
  const notificationsArray =
    notificationsData.notifications || notificationsData; // Access the array directly if it's the only content

  const userNotifications = notificationsArray.filter(
    (notification) => notification.author.id === userId
  );

  return userNotifications.map((notification) => notification.context);
}

export { normalized };
