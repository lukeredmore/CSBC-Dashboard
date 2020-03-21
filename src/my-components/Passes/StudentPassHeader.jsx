import React from 'react'

const StudentPassHeader = ({ selectAddendum }) => (
  <div className="bg-light" style={{ borderBottom: "1px solid #e1e5eb" }}>
    <span className="custom-table-header-cell" style={{ width: "10%" }}>
      {"Select" + (selectAddendum ? selectAddendum : "")}
    </span>
    <span className="custom-table-header-cell" style={{ width: "12%" }}>
      ID(s)
    </span>
    <span className="custom-table-header-cell" style={{ width: "6%" }}>
      Grade
    </span>
    <span className="custom-table-header-cell" style={{ width: "20%" }}>
      Name
    </span>
    <span className="custom-table-header-cell" style={{ width: "26%" }}>
      Status
    </span>
    <span className="custom-table-header-cell" style={{ width: "16%" }}>
      Last Updated
    </span>
    <span className="custom-table-header-cell" style={{ width: "10%" }}>
      Log
    </span>
  </div>
)

export default StudentPassHeader