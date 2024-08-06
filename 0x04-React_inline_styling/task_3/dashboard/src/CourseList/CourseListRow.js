import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  return (
    <tr
      className={css(
        isHeader ? styles.headerRowBackground : styles.rowBackground
      )}
    >
      {isHeader ? (
        textSecondCell === null ? (
          <th className={css(styles.firstChild)} colSpan={2}>
            {textFirstCell}
          </th>
        ) : (
          <>
            <th className={css(styles.secondeChild)}>{textFirstCell}</th>
            <th className={css(styles.secondeChild)}>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td>{textFirstCell}</td>
          <td>{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CourseListRow.defaultProps = {
  isHeader: false,
  textSecondCell: null,
};

const styles = StyleSheet.create({
  rowBackground: {
    backgroundColor: "#f5f5f5ab",
  },
  headerRowBackground: {
    backgroundColor: "#deb5b545",
  },
  firstChild: {
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "2px solid #ddd",
  },
  secondeChild: {
    fontWeight: "bold",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
});
export default CourseListRow;
