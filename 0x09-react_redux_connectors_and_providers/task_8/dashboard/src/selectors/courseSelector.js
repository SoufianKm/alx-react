import { createSelector } from "reselect";
import { fromJS } from "immutable";

export const selectCourses = (state) => state.get("courses");

export const selectAllCourses = createSelector([selectCourses], (courses) =>
  courses.valueSeq().toList()
);
