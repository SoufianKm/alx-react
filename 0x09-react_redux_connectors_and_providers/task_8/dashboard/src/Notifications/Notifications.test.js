import React from "react";
import Notifications from "./Notifications";
import { shallow } from "enzyme";
import {
  fetchNotifications,
  markAsRead,
  setNotificationFilter, // Import the setNotificationFilter action
} from "../../actions/notificationActionCreators";

jest.mock("../../actions/notificationActionCreators");

describe("Notifications", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    fetchNotifications.mockImplementation(() => jest.fn());
    markAsRead.mockImplementation(() => jest.fn());
    setNotificationFilter.mockImplementation(() => jest.fn()); // Mock the new action

    props = {
      displayDrawer: true,
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      fetchNotifications,
      markAsRead,
      setLoadingState: jest.fn(),
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
      setNotificationFilter, // Include the mocked action here
    };

    wrapper = shallow(<Notifications {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetchNotifications is called on componentDidMount", () => {
    expect(props.fetchNotifications).toHaveBeenCalled();
  });

  it("setLoadingState is called with true on componentDidMount", () => {
    expect(props.setLoadingState).toHaveBeenCalledWith(true);
  });

  it("displays the correct number of notifications", () => {
    expect(wrapper.find("NotificationItem").length).toBe(1);
  });

  it("markAsRead is called when markNotificationAsRead is triggered", () => {
    wrapper.instance().markNotificationAsRead(1);
    expect(props.markAsRead).toHaveBeenCalledWith(1);
  });

  it("clicking the first button calls setNotificationFilter with 'urgent'", () => {
    wrapper.find("button").at(0).simulate("click"); // Click the first filter button
    expect(props.setNotificationFilter).toHaveBeenCalledWith("urgent");
  });

  it("clicking the second button calls setNotificationFilter with 'default'", () => {
    wrapper.find("button").at(1).simulate("click"); // Click the second filter button
    expect(props.setNotificationFilter).toHaveBeenCalledWith("default");
  });
});
