// Notifications.test.js
import React from "react";
import Notifications from "./Notifications";
import { shallow } from "enzyme";
import {
  markAsRead,
  setNotificationFilter,
} from "../../actions/notificationActionCreators";

jest.mock("../../actions/notificationActionCreators");

describe("Notifications", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    markAsRead.mockImplementation(() => jest.fn());
    setNotificationFilter.mockImplementation(() => jest.fn());

    props = {
      displayDrawer: true,
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      markAsRead,
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
      setNotificationFilter,
    };

    wrapper = shallow(<Notifications {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays the correct number of notifications", () => {
    expect(wrapper.find("NotificationItem").length).toBe(1);
  });

  it("markAsRead is called when markNotificationAsRead is triggered", () => {
    wrapper.instance().markNotificationAsRead(1);
    expect(props.markAsRead).toHaveBeenCalledWith(1);
  });

  it("clicking the first button calls setNotificationFilter with 'urgent'", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(props.setNotificationFilter).toHaveBeenCalledWith("urgent");
  });

  it("clicking the second button calls setNotificationFilter with 'default'", () => {
    wrapper.find("button").at(1).simulate("click");
    expect(props.setNotificationFilter).toHaveBeenCalledWith("default");
  });
});
