import React from "react";
import NotificationItem from "./NotificationItem";
import { shallow } from "enzyme";

describe("rendering components", () => {
  it("renders NotificationItem component without crashing", () => {
    const wrapper = shallow(<NotificationItem />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct html from type="default" value="test" props', () => {
    const wrapper = shallow(<NotificationItem />);

    wrapper.setProps({ type: "default", value: "test" });
    expect(wrapper.html()).toEqual(
      '<li data-notification-type="default">test</li>'
    );
  });

  it('renders correct html from  html="<u>test</u>" props', () => {
    const wrapper = shallow(<NotificationItem />);

    wrapper.setProps({ html: "<u>test</u>" });
    expect(wrapper.html()).toEqual('<li data-urgent="true"><u>test</u></li>');
  });
});

describe("NotificationItem Component", () => {
  it("should call the markAsRead function with the correct ID when clicked", () => {
    const markAsReadSpy = jest.fn();
    const wrapper = shallow(
      <NotificationItem
        id={1}
        type="default"
        value="Test notification"
        markAsRead={markAsReadSpy}
      />
    );

    // Find the list item and simulate a click
    wrapper.find("li").simulate("click");

    // Check if the spy was called with the correct ID
    expect(markAsReadSpy).toHaveBeenCalledWith(1);
  });

  it("should call the markAsRead function with the correct ID when html prop is provided and clicked", () => {
    const markAsReadSpy = jest.fn();
    const wrapper = shallow(
      <NotificationItem
        id={2}
        html="<strong>HTML notification</strong>"
        markAsRead={markAsReadSpy}
      />
    );

    // Find the list item and simulate a click
    wrapper.find("li").simulate("click");

    // Check if the spy was called with the correct ID
    expect(markAsReadSpy).toHaveBeenCalledWith(2);
  });
});
