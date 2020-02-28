import React from "react"
import "./AddSchedulePreview.scss"

const AddSchedulePreview = ({onClick}) => (
  <div className="add-schedule-wrapper" onClick={onClick}>
    <i className="fa fa-plus add-schedule" />
  </div>
)

export default AddSchedulePreview
