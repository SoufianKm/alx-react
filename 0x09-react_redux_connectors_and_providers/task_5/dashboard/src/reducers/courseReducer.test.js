// courseReducer.test.js
import courseReducer from "./courseReducer";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";
import { fromJS } from "immutable";

describe("courseReducer", () => {
  it("should return the initial state", () => {
    const state = courseReducer(undefined, {});
    expect(state.toJS()).toEqual({});
  });

  it("should handle FETCH_COURSE_SUCCESS and return the correct state", () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
    };
    const expectedState = fromJS({
      1: { id: 1, name: "ES6", credit: 60, isSelected: false },
      2: { id: 2, name: "Webpack", credit: 20, isSelected: false },
      3: { id: 3, name: "React", credit: 40, isSelected: false },
    });
    const state = courseReducer(undefined, action);
    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it("should handle SELECT_COURSE and return the correct state", () => {
    const initialState = fromJS({
      1: { id: 1, name: "ES6", credit: 60, isSelected: false },
      2: { id: 2, name: "Webpack", credit: 20, isSelected: false },
      3: { id: 3, name: "React", credit: 40, isSelected: false },
    });
    const action = {
      type: SELECT_COURSE,
      index: 2,
    };
    const expectedState = initialState.setIn([2, "isSelected"], true);
    const state = courseReducer(initialState, action);
    expect(state.toJS()).toEqual(expectedState.toJS());
  });

  it("should handle UNSELECT_COURSE and return the correct state", () => {
    const initialState = fromJS({
      1: { id: 1, name: "ES6", credit: 60, isSelected: false },
      2: { id: 2, name: "Webpack", credit: 20, isSelected: true },
      3: { id: 3, name: "React", credit: 40, isSelected: false },
    });
    const action = {
      type: UNSELECT_COURSE,
      index: 2,
    };
    const expectedState = initialState.setIn([2, "isSelected"], false);
    const state = courseReducer(initialState, action);
    expect(state.toJS()).toEqual(expectedState.toJS());
  });
});
