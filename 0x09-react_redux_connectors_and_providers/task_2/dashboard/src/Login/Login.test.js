import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

describe("<Login />", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toEqual(true);
  });
  it("should have 2 input tags and 2 label tags", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("label")).toHaveLength(2);
    expect(wrapper.find("input")).toHaveLength(3);
  });

  it("should have the submit button disabled by default", () => {
    const wrapper = shallow(<Login />);
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("should enable the submit button when both inputs are filled", () => {
    const wrapper = shallow(<Login />);

    // Simulate entering an email
    wrapper.find('input[type="email"]').simulate("change", {
      target: { value: "test@example.com" },
    });

    // Simulate entering a password
    wrapper.find('input[type="password"]').simulate("change", {
      target: { value: "password123" },
    });

    // Re-find the submit button and check if it's enabled
    const submitButton = wrapper.find('input[type="submit"]');
    expect(submitButton.prop("disabled")).toBe(false);
  });
});
