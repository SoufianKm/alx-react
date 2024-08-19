import notificationsData from "../../notifications.json";

export function getAllNotificationsByUser(userId) {
  const notificationsArray =
    notificationsData.notifications || notificationsData; // Access the array directly if it's the only content

  const userNotifications = notificationsArray.filter(
    (notification) => notification.author.id === userId
  );

  return userNotifications.map((notification) => notification.context);
}
