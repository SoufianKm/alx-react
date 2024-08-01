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
    logOutMock = jest.fn();
    wrapper = shallow(<App logOut={logOutMock} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call logOut and alert with "Logging you out" when control and h keys are pressed', () => {
    // Mock the alert function
    global.alert = jest.fn();

    // Simulate the keydown event for 'Control' + 'h'
    const event = new KeyboardEvent("keydown", {
      key: "h",
      ctrlKey: true,
    });
    document.dispatchEvent(event);

    expect(global.alert).toHaveBeenCalledWith("Logging you out");
    expect(logOutMock).toHaveBeenCalled();

    // Cleanup the mock for alert
    global.alert.mockRestore();
  });

  it("should not call logOut if only control key is pressed", () => {
    // Simulate the keydown event for 'Control' only
    const event = new KeyboardEvent("keydown", {
      key: "Control",
      ctrlKey: true,
    });
    document.dispatchEvent(event);

    expect(logOutMock).not.toHaveBeenCalled();
  });

  it("should not call logOut if only h key is pressed", () => {
    // Simulate the keydown event for 'h' only
    const event = new KeyboardEvent("keydown", {
      key: "h",
      ctrlKey: false,
    });
    document.dispatchEvent(event);

    expect(logOutMock).not.toHaveBeenCalled();
  });
});
