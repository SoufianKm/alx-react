import React from "react";
import Notifications from "./Notifications";
import { shallow } from "enzyme";
import {
  fetchNotifications,
  markAsRead,
} from "../../actions/notificationActionCreators";

jest.mock("../../actions/notificationActionCreators");

describe("Notifications", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    fetchNotifications.mockImplementation(() => jest.fn());
    markAsRead.mockImplementation(() => jest.fn());

    props = {
      displayDrawer: true,
      listNotifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      fetchNotifications,
      markAsRead, // Include the mock action here
      setLoadingState: jest.fn(),
      handleDisplayDrawer: jest.fn(),
      handleHideDrawer: jest.fn(),
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
});
