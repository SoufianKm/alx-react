import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";

describe("<App />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders a div with the class App-header", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div.App-header").exists()).toBe(true);
  });

  it("renders a div with the class App-body", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div.App-body").exists()).toBe(true);
  });

  it("renders a div with the class App-footer", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("div.App-footer").exists()).toBe(true);
  });

  it("renders without crashing", () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });

  it("should render Notifications component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Notifications />)).toBe(true);
  });

  it("should render Header component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Header />)).toBe(true);
  });

  it("should render Login Component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Login />)).toBe(true);
  });
  it("should render Footer component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Footer />)).toBe(true);
  });
});
