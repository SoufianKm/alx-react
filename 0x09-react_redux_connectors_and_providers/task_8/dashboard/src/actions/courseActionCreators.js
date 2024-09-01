const {
  SELECT_COURSE,
  UNSELECT_COURSE,
  SET_COURSES,
} = require("./courseActionTypes");

// Action to set courses
export function setCourses(courses) {
  return {
    type: SET_COURSES,
    courses,
  };
}

// Function to fetch courses from API
export function fetchCourses() {
  return (dispatch) => {
    return fetch("/dist/courses.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setCourses(data));
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
}

// Existing action creators
export function selectCourse(index) {
  return {
    type: SELECT_COURSE,
    index: index,
  };
}

export const boundSelectCourse = (index) => dispatch(selectCourse(index));

export function unSelectCourse(index) {
  return {
    type: UNSELECT_COURSE,
    index: index,
  };
}

export const boundUnSelectCourse = (index) => dispatch(unSelectCourse(index));
