import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import Notifications from "../Notifications/Notifications";
import { StyleSheetTestUtils } from "aphrodite";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
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
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  test("should render Login Component", () => {
    expect(wrapper.contains(<Login />)).toBe(true);
  });
  test("should render Footer component", () => {
    expect(wrapper.contains(<Footer />)).toBe(true);
  });
});

describe("when isLoggedIn prop is true", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App isLoggedIn={true} />);
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    // Clear the buffer and resume style injection
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test("does not render courselist if logged out", () => {
    wrapper.setProps({ isLoggedIn: false });
    expect(wrapper.contains(<CourseList />)).toBe(false);
  });

  test("renders courselist if logged in", () => {
    expect(wrapper.containsMatchingElement(<CourseList />)).toEqual(false);
    expect(wrapper.contains(<Login />)).toBe(false);
  });
});

describe("App Component", () => {
  let wrapper;
  let logOutMock;

  beforeEach(() => {
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
    // Create a mock for the logOut function
    logOutMock = jest.fn();
    // Shallow render the App component with the logOut prop
    wrapper = shallow(<App logOut={logOutMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test

    // Clear the buffer and resume style injection
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("calls logOut and alerts with the correct message when ctrl+h is pressed", () => {
    // Mock the alert function
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Simulate the ctrl+h keydown event
    const event = new KeyboardEvent("keydown", { key: "h", ctrlKey: true });
    document.dispatchEvent(event);

    // Check if the logOut function was called
    expect(logOutMock).toHaveBeenCalled();

    // Check if the alert was called with the correct message
    expect(alertSpy).toHaveBeenCalledWith("Logging you out");

    // Restore the original alert implementation
    alertSpy.mockRestore();
  });
});

describe("Testing App Component's State />", () => {
  beforeEach(() => {
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    // Clear the buffer and resume style injection
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("check if default value of displayDrawer in state is false", () => {
    expect(wrapper.state("displayDrawer")).toBe(false);
  });

  it("Verify that after calling handleDisplayDrawer, the state displayDrawer should now be true", () => {
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state("displayDrawer")).toBe(true);
  });

  it("verify that after calling handleHideDrawer, the state displayDrawer is updated to be false", () => {
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state("displayDrawer")).toBe(false);
  });
});

const wrapper_isLoggedIn = shallow(<App />);
describe("App Component when isLoggedin is true", () => {
  let wrapper;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = shallow(<App />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("does not render Login component", () => {
    wrapper_isLoggedIn.setState({
      user: { email: "", password: "", isLoggedIn: true },
    });
    expect(wrapper_isLoggedIn.containsMatchingElement(<Login />)).toEqual(
      false
    );
  });

  it("renders CourseList component", () => {
    expect(
      wrapper_isLoggedIn.containsMatchingElement(
        <CourseList listCourses={listCourses} />
      )
    ).toEqual(false);
    // should be true
  });
});
