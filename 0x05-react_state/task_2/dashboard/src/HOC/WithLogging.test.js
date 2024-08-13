import React from "react";
import { shallow } from "enzyme";
import WithLogging from "./WithLogging";

const TestComponent = () => <p>Test Component</p>;

describe("WithLogging HOC", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("logs on mount and unmount", () => {
    const WrappedComponent = WithLogging(TestComponent);
    const wrapper = shallow(<WrappedComponent />);

    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component TestComponent is mounted"
    );

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Component TestComponent is going to unmount"
    );
  });

  it("should log the correct messages", () => {
    const WrappedComponent = WithLogging(TestComponent);
    const wrapper = shallow(<WrappedComponent />);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Component TestComponent is mounted"
    );

    wrapper.unmount();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Component TestComponent is going to unmount"
    );
  });
});
