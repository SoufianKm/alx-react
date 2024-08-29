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
      user: {},
    });
  });

  // Test when SELECT_COURSE action is passed
  it("should return the initial state when SELECT_COURSE action is passed", () => {
    const action = { type: "SELECT_COURSE" };
    const state = uiReducer(undefined, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state).toEqual({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: false,
      user: {},
    });
  });

  // Test DISPLAY_NOTIFICATION_DRAWER action
  it("should handle DISPLAY_NOTIFICATION_DRAWER action", () => {
    const action = { type: DISPLAY_NOTIFICATION_DRAWER };
    const state = uiReducer(undefined, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isNotificationDrawerVisible).toBe(true);
  });

  // Test HIDE_NOTIFICATION_DRAWER action
  it("should handle HIDE_NOTIFICATION_DRAWER action", () => {
    const initialState = Map({
      isNotificationDrawerVisible: true,
      isUserLoggedIn: false,
      user: {},
    });
    const action = { type: HIDE_NOTIFICATION_DRAWER };
    const state = uiReducer(initialState, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isNotificationDrawerVisible).toBe(false);
  });

  // Test LOGIN_SUCCESS action
  it("should handle LOGIN_SUCCESS action", () => {
    const action = { type: LOGIN_SUCCESS };
    const state = uiReducer(undefined, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isUserLoggedIn).toBe(true);
  });

  // Test LOGIN_FAILURE action
  it("should handle LOGIN_FAILURE action", () => {
    const action = { type: LOGIN_FAILURE };
    const state = uiReducer(undefined, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isUserLoggedIn).toBe(false);
  });

  // Test LOGOUT action
  it("should handle LOGOUT action", () => {
    const initialState = Map({
      isNotificationDrawerVisible: false,
      isUserLoggedIn: true,
      user: {},
    });
    const action = { type: LOGOUT };
    const state = uiReducer(initialState, action).toJS(); // Convert to plain JavaScript object for comparison
    expect(state.isUserLoggedIn).toBe(false);
  });
});
