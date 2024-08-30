import { createStore } from "redux";
import { Map } from "immutable";
import uiReducer from "./uiReducer";
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/uiActionTypes";

describe("uiReducer", () => {
  // Test initial state
  it("should return the initial state when no action is passed", () => {
    const store = createStore(uiReducer);
    const state = store.getState().toJS(); // Convert to plain JavaScript object for comparison
    expect(state).toEqual({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: null, // Updated initial state to null
    });
  });

  // Other tests...

  // Test LOGIN_SUCCESS action
  it("should handle LOGIN_SUCCESS action and update user", () => {
    const action = { type: LOGIN_SUCCESS, user: { email: "test@test.com" } };
    const state = uiReducer(undefined, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isUserLoggedIn).toBe(true);
    expect(state.user).toEqual({ email: "test@test.com" });
  });

  // Test LOGOUT action
  it("should handle LOGOUT action and clear user", () => {
    const initialState = Map({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: { email: "test@test.com" },
    });
    const action = { type: LOGOUT };
    const state = uiReducer(initialState, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isUserLoggedIn).toBe(false);
    expect(state.user).toBeNull();
  });
});
