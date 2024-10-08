import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import { StyleSheetTestUtils } from "aphrodite";

describe("<Notifications />", () => {
  // Suppress style injection before all tests
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  // Resume style injection after all tests
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    shallow(<Notifications />);
  });

  it("renders correct text when listNotifications is not empty", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );

    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(
      true
    );
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);

    expect(wrapper.find("div.menuItem").exists()).toBe(true);
    expect(wrapper.find("div.menuItem").html()).toEqual(
      '<div class="menuItem"><p>Your notifications</p></div>'
    );
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);

    expect(wrapper.find("div.Notifications").exists()).toBe(false);
  });

  it("displays menuItem when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);

    expect(wrapper.find("div.menuItem").exists()).toBe(true);
  });

  it("displays Notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);

    expect(wrapper.find("div.Notifications").exists()).toBe(true);
  });

  it("renders correctly when listNotifications is not passed", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);

    expect(
      wrapper.containsMatchingElement(<p>No new notification for now</p>)
    ).toBe(true);
  });

  it("renders correctly when empty array is passed", () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );

    expect(
      wrapper.containsMatchingElement(<p>No new notification for now</p>)
    ).toBe(true);
  });

  it('renders "No new notifications for now" instead of "Here is the list of notifications" when listNotifications is empty', () => {
    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={[]} />
    );

    expect(
      wrapper.containsMatchingElement(<p>Here is the list of notifications</p>)
    ).toBe(false);

    expect(
      wrapper.containsMatchingElement(<p>No new notification for now</p>)
    ).toBe(true);
  });
});

describe("Notifications Component", () => {
  it("should call console.log with the correct message when markAsRead is called", () => {
    const logSpy = jest.spyOn(console, "log");
    const wrapper = shallow(<Notifications />);
    const instance = wrapper.instance();

    // Assuming markAsRead takes an ID as an argument and logs it
    instance.markAsRead(1);

    expect(logSpy).toHaveBeenCalledWith(
      "Notification 1 has been marked as read"
    );

    // Cleanup
    logSpy.mockRestore();
  });

  it("does not rerender when updating props with the same list", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    const wrapper = shallow(
      <Notifications
        displayDrawer={true}
        listNotifications={listNotifications}
      />
    );

    const instance = wrapper.instance();
    jest.spyOn(instance, "render");

    // Update props with the same list
    wrapper.setProps({ listNotifications });

    expect(instance.render).toHaveBeenCalledTimes(0);
  });

  it("rerenders when updating props with a longer list", () => {
    const initialList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
    ];

    const longerList = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "default", value: "New project available" },
    ];

    const wrapper = shallow(
      <Notifications displayDrawer={true} listNotifications={initialList} />
    );

    const instance = wrapper.instance();
    jest.spyOn(instance, "render");

    // Update props with a longer list
    wrapper.setProps({ listNotifications: longerList });

    expect(instance.render).toHaveBeenCalled();
  });
});
