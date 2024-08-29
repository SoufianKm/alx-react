// courseReducer.js
import { Map } from "immutable";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";
import { coursesNormalizer } from "../schema/courses";

const initialState = Map();

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      const normalizedData = coursesNormalizer(action.data);

      // Map through the normalized data to add isSelected
      const coursesWithSelection = Object.keys(
        normalizedData.entities.courses
      ).reduce((acc, courseId) => {
        acc[courseId] = {
          ...normalizedData.entities.courses[courseId],
          isSelected: false, // Set isSelected to false for each course
        };
        return acc;
      }, {});

      return state.merge(coursesWithSelection);

    case SELECT_COURSE:
      return state.setIn([action.index, "isSelected"], true);

    case UNSELECT_COURSE:
      return state.setIn([action.index, "isSelected"], false);

    default:
      return state;
  }
};

export default courseReducer;
