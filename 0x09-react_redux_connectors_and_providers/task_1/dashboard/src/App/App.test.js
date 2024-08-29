import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import Notifications from "../Notifications/Notifications";
import { StyleSheetTestUtils } from "aphrodite";
import { mapStateToProps } from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import uiReducer, { initialState } from "../reducers/uiReducer";
import { fromJS } from "immutable";
import { AppContext } from "./AppContext";

const store = createStore(uiReducer, fromJS(initialState));

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // Suppress style injection for tests
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    // Clear the buffer and resume style injection
    wrapper.unmount();
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
    wrapper = shallow(
      <Provider store={store}>
        <App isLoggedIn={true} />
      </Provider>
    );
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  test("does not render Login component if logged in", () => {
    expect(wrapper.find(Login).length).toBe(0);
  });

  test("renders CourseList component if logged in", () => {
    expect(wrapper.find(CourseList).length).toBe(1);
  });
});

describe("App Component", () => {
  let wrapper;
  let logOutMock;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    logOutMock = jest.fn();
    wrapper = mount(
      <Provider store={store}>
        <App logOut={logOutMock} />
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("calls logOut and alerts with the correct message when ctrl+h is pressed", () => {
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    const event = new KeyboardEvent("keydown", { key: "h", ctrlKey: true });
    document.dispatchEvent(event);

    expect(logOutMock).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Logging you out");

    alertSpy.mockRestore();
  });
});

describe("Testing App Component's State", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("checks if default value of displayDrawer in state is false", () => {
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

describe("mapStateToProps", () => {
  it("should return the right object when passing the state", () => {
    const state = fromJS({
      isUserLoggedIn: true,
    });
    const expectedProps = {
      isLoggedIn: true,
    };
    const props = mapStateToProps(state);
    expect(props).toEqual(expectedProps);
  });
});
