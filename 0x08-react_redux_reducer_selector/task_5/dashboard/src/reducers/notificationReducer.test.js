// notificationReducer.test.js
import notificationReducer from "./notificationReducer";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "../actions/notificationActionTypes";
import { fromJS } from "immutable";

describe("notificationReducer", () => {
  const initialState = fromJS({
    notifications: [],
    filter: "DEFAULT",
  });

  it("should return the default state", () => {
    const state = notificationReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("should handle FETCH_NOTIFICATIONS_SUCCESS and return the correct state", () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
    };

    const expectedState = fromJS({
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
    });

    const state = notificationReducer(undefined, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle MARK_AS_READ and return the correct state", () => {
    const initialState = fromJS({
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
    });
    const action = {
      type: MARK_AS_READ,
      index: 1, // Adjusted to use the correct index (0-based)
    };
    const expectedState = fromJS({
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
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle SET_TYPE_FILTER and return the correct state", () => {
    const action = {
      type: SET_TYPE_FILTER,
      filter: "URGENT",
    };
    const initialState = fromJS({
      filter: "DEFAULT",
      notifications: [
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
    });
    const expectedState = fromJS({
      filter: "URGENT",
      notifications: [
        {
          id: 1,
          type: "default",
          value: "New course available",
          isRead: false,
        },
        { id: 2, type: "urgent", value: "New resume available", isRead: false },
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
    });
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
