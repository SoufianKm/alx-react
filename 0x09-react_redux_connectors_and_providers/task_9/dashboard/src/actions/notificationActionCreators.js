import { MARK_AS_READ, SET_TYPE_FILTER } from "./notificationActionTypes";
import {
  SET_LOADING_STATE,
  FETCH_NOTIFICATIONS_SUCCESS,
} from "./uiActionTypes";

export function markAsRead(index) {
  return {
    type: MARK_AS_READ,
    index: index,
  };
}

export const boundMarkAsRead = (index) => dispatch(markAsRead(index));

export function setNotificationFilter(filter) {
  return {
    type: SET_TYPE_FILTER,
    filter: filter,
  };
}

export const boundSetNotificationFilter = (filter) =>
  dispatch(setNotificationFilter(filter));

// Action creator to set loading state
export const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});

// Action creator to set notifications
export const setNotifications = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  notifications,
});

// Thunk action creator to fetch notifications
export const fetchNotifications = () => {
  return (dispatch) => {
    dispatch(setLoadingState(true));

    fetch("/notifications.json")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setNotifications(data));
        dispatch(setLoadingState(false));
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
        dispatch(setLoadingState(false));
      });
  };
};
