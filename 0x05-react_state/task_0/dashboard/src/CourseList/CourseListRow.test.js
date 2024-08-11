import React from "react";
import { shallow } from "enzyme";
import CourseListRow from "./CourseListRow";

describe("CourseListRow", () => {
  if (
    ("render without crashing",
    () => {
      const wrapper = shallow(<CourseListRow textFirstCell="test" />);
      expect(wrapper.exists()).toBe(true);
    })
  );

  if (
    ("renders one cell with colspan = 2 when textSecondCell does not exist",
    () => {
      const wrapper = shallow(
        <CourseListRow
          isHeader={true}
          textFirstCell="test"
          textSecondCell={null}
        />
      );

      expect(wrapper.find("tr").children()).toHaveLength(1);
      expect(wrapper.find("tr").childAt(0).html()).toEqual(
        '<th colSpan="2">test</th>'
      );
    })
  );

  it("should render two cells when textSecondCell not null", () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={false}
        textFirstCell="test"
        textSecondCell="test"
      />
    );

    expect(wrapper.find("tr").children()).toHaveLength(2);
    expect(wrapper.find("tr").childAt(0).html()).toEqual("<td>test</td>");
    expect(wrapper.find("tr").childAt(1).html()).toEqual("<td>test</td>");
  });
});

describe("Test inline styles", () => {
  it("should have a background color #deb5b545 when isHeader prop is true", () => {
    const wrapper = shallow(
      <CourseListRow
        isHeader={true}
        textFirstCell="test"
        textSecondCell="test"
      />
    );
    const style = wrapper.prop("style");
    expect(style).toHaveProperty("backgroundColor", "#deb5b545");
  });

  it("should have a background color #f5f5f5ab when isHeader prop is false", () => {
    const wrapper = shallow(<CourseListRow
      isHeader={false}
      textFirstCell="test"
      textSecondCell="test"
    />);
    const style = wrapper.prop("style");
    expect(style).not.toHaveProperty("backgroundColor", "#deb5b545");
  });
});
