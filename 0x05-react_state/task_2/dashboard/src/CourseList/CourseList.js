import React from "react";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import CourseShape from "./CourseShape";
import { StyleSheet, css } from "aphrodite";

function CourseList({ listCourses }) {
  return (
    <table
      id="CourseList"
      className={css(
        styles.borderCollapse,
        styles.width,
        styles.border,
        styles.fontSize
      )}
    >
      <thead
        className={css(
          styles.fontWeightBold,
          styles.textAlignCenter,
          styles.borderBottom
        )}
      >
        <CourseListRow textFirstCell="Available courses" isHeader={true} />
        <CourseListRow
          textFirstCell="Course name"
          textSecondCell="Credit"
          isHeader={true}
        />
      </thead>
      <tbody className={css(styles.textAlignLeft)}>
        {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit }) => (
            <CourseListRow
              key={id}
              textFirstCell={name}
              textSecondCell={credit}
            />
          ))
        ) : (
          <CourseListRow textFirstCell="No course available yet" />
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
  listCourses: [],
};

const styles = StyleSheet.create({
  borderCollapse: { borderCollapse: "collapse" },
  width: { width: "100%" },
  border: { border: "1px solid #ddd" },
  fontSize: { fontSize: "1.1rem" },

  textAlignLeft: { textAlign: " left" },
});

export default CourseList;
