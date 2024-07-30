import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

describe("Header", () => {
    if ("renders without crashing", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.exists()).toBe(true);
    });

    if("should render img and h1 tags", () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.find('img').length).toBe(1);
        expect(wrapper.find('h1').length).toBe(1);
    });
});