import React from 'react'

const StudentPassHeader = ({ selectAddendum }) => (
  <div className="bg-light" style={{ borderBottom: "1px solid #e1e5eb" }}>
    <span className="custom-table-header-cell select-column">
      {selectAddendum ? selectAddendum : "-"}
    </span>
    <span className="custom-table-header-cell id-column">ID(s)</span>
    <span className="custom-table-header-cell grade-column">Grade</span>
    <span className="custom-table-header-cell name-column">Name</span>
    <span className="custom-table-header-cell status-column">Status</span>
    <span className="custom-table-header-cell updated-column">Time</span>
    <span className="custom-table-header-cell log-column">Log</span>
    <span className="custom-table-header-cell more-column">More</span>
  </div>
)

export default StudentPassHeader