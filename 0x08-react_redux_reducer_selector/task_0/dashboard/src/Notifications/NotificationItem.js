import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

class NotificationItem extends Component {
  render() {
    const { type, value, html, markAsRead, id } = this.props;
    return (
      <>
        {type && value ? (
          <li
            onClick={() => markAsRead(id)}
            className={css(
              styles.li,
              type === "default" ? styles.defaultColor : styles.urgentColor
            )}
          >
            {value}
          </li>
        ) : null}
        {html ? (
          <li
            onClick={() => markAsRead(id)}
            className={css(styles.urgentColor, styles.li)}
            dangerouslySetInnerHTML={{ __html: html }}
          ></li>
        ) : null}
      </>
    );
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  __html: PropTypes.shape({
    html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: "default",
  markAsRead: () => {
    console.log("empty func");
  },
  id: 0,
};

const styles = StyleSheet.create({
  defaultColor: {
    color: "#210a61",
  },
  urgentColor: {
    color: "#e01d3f",
  },
  li: {
    "@media (max-width: 767px)": {
      borderBottom: "1px solid #000",
      padding: "10px 8px",
      fontSize: "20px",
    },
  },
});

export default NotificationItem;
