import { fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotificationsByType,
} from "./notificationSelector";

describe("notification selectors", () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      filter: "default", // Set default filter
      notifications: [
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: true },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
    });
  });

  it("filterTypeSelected returns the correct filter type", () => {
    expect(filterTypeSelected(state)).toEqual("default");
  });

  it("getNotifications returns the correct list of notifications", () => {
    expect(getNotifications(state)).toEqual(
      fromJS([
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: true },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ])
    );
  });

  it("getUnreadNotificationsByType returns all unread notifications for default filter", () => {
    expect(getUnreadNotificationsByType(state)).toEqual(
      fromJS([
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ])
    );
  });

  it("getUnreadNotificationsByType returns only unread urgent notifications when filter is set to 'urgent'", () => {
    state = state.set("filter", "urgent"); // Update the filter to 'urgent'
    expect(getUnreadNotificationsByType(state)).toEqual(
      fromJS([
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ])
    );
  });

  it("getUnreadNotificationsByType returns only unread default notifications when filter is set to 'default'", () => {
    state = state.set("filter", "default"); // Update the filter to 'default'
    expect(getUnreadNotificationsByType(state)).toEqual(
      fromJS([
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
      ])
    );
  });
});
