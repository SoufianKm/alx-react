import React, { useEffect } from "react";
import CourseListRow from "./CourseListRow";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from "../actions/courseActionCreators";
import { getListCourses } from "../selectors/courseSelector"; // Assuming this is the correct path
import { StyleSheet, css } from "aphrodite";

function CourseList({
  listCourses,
  fetchCourses,
  selectCourse,
  unSelectCourse,
}) {
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onChangeRow = (id, checked) => {
    if (checked) {
      selectCourse(id);
    } else {
      unSelectCourse(id);
    }
  };

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
          listCourses.map(({ id, name, credit, isSelected }) => (
            <CourseListRow
              key={id}
              textFirstCell={name}
              textSecondCell={credit}
              isChecked={isSelected} // Pass isChecked prop
              onChangeRow={onChangeRow} // Pass the onChangeRow function
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
  listCourses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      credit: PropTypes.number.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })
  ),
  fetchCourses: PropTypes.func.isRequired,
  selectCourse: PropTypes.func.isRequired,
  unSelectCourse: PropTypes.func.isRequired,
};

CourseList.defaultProps = {
  listCourses: [],
};

// Styles
const styles = StyleSheet.create({
  borderCollapse: { borderCollapse: "collapse" },
  width: { width: "100%" },
  border: { border: "1px solid #ddd" },
  fontSize: { fontSize: "1.1rem" },
  textAlignLeft: { textAlign: "left" },
});

// Connect to Redux store
const mapStateToProps = (state) => ({
  listCourses: getListCourses(state), // Use the selector to get the list of courses
});

const mapDispatchToProps = {
  fetchCourses,
  selectCourse,
  unSelectCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
