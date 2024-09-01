import notificationReducer from "./notificationReducer";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
} from "../actions/notificationActionTypes";
import { fromJS } from "immutable";

describe("notificationReducer", () => {
  const initialState = fromJS({
    notifications: [],
    filter: "DEFAULT",
    loading: false, // New default state
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
      loading: false, // Ensure loading is set to false after fetch
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
      loading: false,
    });
    const action = {
      type: MARK_AS_READ,
      index: 1, // Corrected to use the proper index
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
        { id: 2, type: "urgent", value: "New resume available", isRead: true }, // Marked as read
        { id: 3, type: "urgent", value: "New data available", isRead: false },
      ],
      loading: false,
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
      loading: false,
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
      loading: false,
    });
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });

  it("should handle SET_LOADING_STATE and return the correct state", () => {
    const action = {
      type: SET_LOADING_STATE,
      loading: true,
    };
    const expectedState = initialState.set("loading", true);
    const state = notificationReducer(initialState, action);
    expect(state).toEqual(expectedState);
  });
});
