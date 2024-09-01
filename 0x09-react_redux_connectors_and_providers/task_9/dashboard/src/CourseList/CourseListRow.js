import React from "react";
import PropTypes from "prop-types";

function CourseListRow({
  textFirstCell,
  textSecondCell,
  isChecked,
  onChangeRow,
}) {
  const handleChange = (event) => {
    onChangeRow(event.target.id, event.target.checked);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          id={textFirstCell} // Or use the id directly if available
          checked={isChecked}
          onChange={handleChange}
        />
        {textFirstCell}
      </td>
      {textSecondCell && <td>{textSecondCell}</td>}
    </tr>
  );
}

CourseListRow.propTypes = {
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  onChangeRow: PropTypes.func.isRequired,
};

export default CourseListRow;
