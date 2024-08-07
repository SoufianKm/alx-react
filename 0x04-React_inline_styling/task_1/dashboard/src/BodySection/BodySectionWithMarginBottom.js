import PropTypes from "prop-types";
import React, { Component } from "react";
import BodySection from "./BodySection";
import { StyleSheet, StyleSheetTestUtils, css } from "aphrodite";

StyleSheetTestUtils.suppressStyleInjection();

class BodySectionWithMarginBottom extends Component {
  render() {
    return (
      <div className={css(styles.marginBottom)}>
        <BodySection {...this.props} />
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const styles = StyleSheet.create({
  marginBottom: { marginBottom: "40px" },
});
export default BodySectionWithMarginBottom;
