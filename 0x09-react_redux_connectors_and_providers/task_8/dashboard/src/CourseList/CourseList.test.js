import React from "react";
import CourseList from "./CourseList";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from "../actions/courseActionCreators";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const listCourses = [
  { id: "1", name: "ES6", credit: 60, isSelected: false },
  { id: "2", name: "Webpack", credit: 20, isSelected: false },
  { id: "3", name: "React", credit: 40, isSelected: false },
];

describe("CourseList component tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      courses: listCourses,
    });
  });

  it("should render without crashing", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(wrapper.exists()).toBe(true);
  });

  it("should fetch courses when mounted", () => {
    jest.spyOn(store, "dispatch");
    const wrapper = shallow(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith(fetchCourses());
  });

  it("should dispatch selectCourse when checked", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CourseList listCourses={listCourses} />
      </Provider>
    );

    wrapper.find(CourseListRow).at(0).prop("onChangeRow")("1", true);
    const actions = store.getActions();
    expect(actions[0]).toEqual(selectCourse("1"));
  });

  it("should dispatch unSelectCourse when unchecked", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <CourseList listCourses={listCourses} />
      </Provider>
    );

    wrapper.find(CourseListRow).at(0).prop("onChangeRow")("1", false);
    const actions = store.getActions();
    expect(actions[0]).toEqual(unSelectCourse("1"));
  });
});
