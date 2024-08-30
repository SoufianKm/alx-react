import { fromJS } from "immutable";
import {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
} from "./notificationSelector";

describe("notification selectors", () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      filter: "DEFAULT",
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
    expect(filterTypeSelected(state)).toEqual("DEFAULT");
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

  it("getUnreadNotifications returns the correct list of unread notifications", () => {
    expect(getUnreadNotifications(state)).toEqual(
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
});
