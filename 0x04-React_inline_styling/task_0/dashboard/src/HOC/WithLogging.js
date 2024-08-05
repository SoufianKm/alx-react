import React, { Component } from "react";

const WithLogging = (WrappedComponent) => {
  // Utility function to get the display name
  const getDisplayName = (WrappedComponent) =>
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  return class extends Component {
    static displayName = `WithLogging(${getDisplayName(WrappedComponent)})`;

    componentDidMount() {
      console.log(`Component ${getDisplayName(WrappedComponent)} is mounted`);
    }

    componentWillUnmount() {
      console.log(
        `Component ${getDisplayName(WrappedComponent)} is going to unmount`
      );
    }

    render() {
      // Ensure all props are passed to the wrapped component
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default WithLogging;
