import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";
import { StyleSheetTestUtils } from "aphrodite";

describe("Header", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  // Suppress style injection before all tests
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  // Resume style injection after all tests
  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("should render img and h1 tags", () => {
    expect(wrapper.find("img").length).toBe(1);
    expect(wrapper.find("h1").length).toBe(1);
  });
});
