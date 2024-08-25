// notificationReducer.js
import { Map, List } from "immutable";
import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
} from "../actions/notificationActionTypes";
import { notificationsNormalizer } from "../schema/notifications";
import { fromJS } from "immutable"; // Ensure this import is included

const initialState = Map({
  notifications: List(),
  filter: "DEFAULT",
});

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return state.set("notifications", fromJS(action.data)); // Ensure data is Immutable

    case MARK_AS_READ:
      return state.setIn(["notifications", action.index, "isRead"], true);

    case SET_TYPE_FILTER:
      return state.set("filter", action.filter);

    default:
      return state;
  }
};

export default notificationReducer;
