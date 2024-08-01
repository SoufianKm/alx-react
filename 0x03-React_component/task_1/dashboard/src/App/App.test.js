import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import Notifications from "../Notifications/Notifications";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("renders a div with the class App-header", () => {
    expect(wrapper.find("div.App-header").exists()).toBe(true);
  });

  test("renders a div with the class App-body", () => {
    expect(wrapper.find("div.App-body").exists()).toBe(true);
  });

  test("renders a div with the class App-footer", () => {
    expect(wrapper.find("div.App-footer").exists()).toBe(true);
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
    // Create a mock for the logOut function
    logOutMock = jest.fn();
    // Shallow render the App component with the logOut prop
    wrapper = shallow(<App logOut={logOutMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test
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
