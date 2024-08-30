import { Map } from "immutable";
import {
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/uiActionTypes";

// Define the initial state of the reducer using Immutable.js Map
const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: null, // Set the initial user to null
});

// Create the reducer function
const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set("isNotificationDrawerVisible", true);
    case HIDE_NOTIFICATION_DRAWER:
      return state.set("isNotificationDrawerVisible", false);
    case LOGIN_SUCCESS:
      return state.set("isUserLoggedIn", true).set("user", action.user); // Update the user with the one from the action
    case LOGIN_FAILURE:
      return state.set("isUserLoggedIn", false).set("user", null); // Ensure user is null on login failure
    case LOGOUT:
      return state.set("isUserLoggedIn", false).set("user", null); // Clear the user on logout
    default:
      return state;
  }
};

export default uiReducer;
