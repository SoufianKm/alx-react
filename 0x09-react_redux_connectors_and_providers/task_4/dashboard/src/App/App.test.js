import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import Notifications from "../Notifications/Notifications";
import { StyleSheetTestUtils } from "aphrodite";
import { mapStateToProps } from "./App";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = shallow(<App />);
  });

  afterEach(() => {
    // Clear the buffer and resume style injection
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render Notifications component", () => {
    expect(wrapper.find(Notifications).length).toBe(1);
  });

  test("should render Header component", () => {
    expect(wrapper.find(Header).length).toBe(1);
  });

  test("should render Login Component", () => {
    expect(wrapper.find(Login).length).toBe(1);
  });

  test("should render Footer component", () => {
    expect(wrapper.find(Footer).length).toBe(1);
  });
});

describe("when isLoggedIn prop is true", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App isLoggedIn={true} />);
  });

  test("does not render Login component if logged in", () => {
    expect(wrapper.find(Login).length).toBe(0);
  });

  test("renders CourseList component if logged in", () => {
    expect(wrapper.find(CourseList).length).toBe(1);
  });
});

describe("mapStateToProps", () => {
  it("should return the correct props from state", () => {
    const state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: false,
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: false,
    };
    const props = mapStateToProps(state);
    expect(props).toEqual(expectedProps);
  });
});
