// NotificationsContainer.test.js
import React from "react";
import NotificationsContainer from "./NotificationsContainer";
import { shallow } from "enzyme";
import {
  fetchNotifications,
  setLoadingState,
} from "../../actions/notificationActionCreators";

jest.mock("../../actions/notificationActionCreators");

describe("NotificationsContainer", () => {
  let wrapper;

  beforeEach(() => {
    fetchNotifications.mockImplementation(() => jest.fn());
    setLoadingState.mockImplementation(() => jest.fn());
    wrapper = shallow(<NotificationsContainer />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls fetchNotifications and setLoadingState on mount", () => {
    expect(setLoadingState).toHaveBeenCalledWith(true);
    expect(fetchNotifications).toHaveBeenCalled();
  });
});
