// src/reducers/courseReducer.js

import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

// Define the default state
const initialState = [];

// Create the reducer function
const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      // Set the isSelected property to false for every item
      return action.data.map((course) => ({
        ...course,
        isSelected: false,
      }));

    case SELECT_COURSE:
      // Set isSelected to true for the item with the given id
      return state.map((course) =>
        course.id === action.index ? { ...course, isSelected: true } : course
      );

    case UNSELECT_COURSE:
      // Set isSelected to false for the item with the given id
      return state.map((course) =>
        course.id === action.index ? { ...course, isSelected: false } : course
      );

    default:
      return state;
  }
};

export default courseReducer;
