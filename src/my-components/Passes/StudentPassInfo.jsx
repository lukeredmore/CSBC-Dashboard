import React from "react"
import "./StudentPassInfo.scss"

import { getDataFromRef } from "../../firebase"
import MyCheckbox from "../MyCheckbox"
import LogModal from "./LogModal"

class StudentPassInfo extends React.Component {
  state = {
    displayTime: "Loading...",
    colorStatus: "black",
    weightStatus: 400,
    checked: false,
    logDisplayed: null
  }
  interval = null
  gradeLevel = "-"

  async componentDidMount() {
    this.interval = window.setInterval(this.refreshTime, 1000)
    this.gradeLevel = (await this.createGradeLevelMap())[
      this.props.student.graduationYear
    ]
  }

  openModal = (e) => {
    e.stopPropagation()
    this.setState({logDisplayed: this.props.student.log})
  }
  closeModal = () => {
    this.setState({logDisplayed: null}, () => {
      this.props.onClick(this.props.student)
    })
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  refreshTime = () => {
    const signedOut = this.props.student.currentStatus
      .toLowerCase()
      .includes("signed out")
    if (!signedOut) {
      window.clearInterval(this.interval)
      this.setState({
        displayTime: this.getDisplayTime(
          new Date(this.props.student.timeOfStatusChange),
          true
        ),
        colorStatus: "black",
        weightStatus: 400
      })
      return
    }
    const newDisplayTime = this.getDisplayTime(
      new Date(this.props.student.timeOfStatusChange)
    )
    if (newDisplayTime.split("/").length > 1) {
      window.clearInterval(this.interval)
    }
    const split = newDisplayTime.split(":")
    let colorStatus = "black"
    let weightStatus = 400
    if (split.length === 2 && Number(split[0]) >= 15) {
      colorStatus = "orange"
      weightStatus = 600
    } else if (split.length === 3) {
      colorStatus = "#DD3333"
      weightStatus = 750
    }
    this.setState({
      displayTime: newDisplayTime,
      colorStatus: colorStatus,
      weightStatus: weightStatus
    })
  }

  getDisplayTime = (dateChanged, forceFull = false) => {
    const timeInMilliseconds = new Date() - dateChanged
    let h, m, s
    h = Math.floor(timeInMilliseconds / 1000 / 60 / 60)

    if (h > 23 || forceFull) {
      const dateString = dateChanged.toLocaleDateString("en-US")
      const timeString = dateChanged.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York"
      })
      const todaysDateString = new Date().toLocaleDateString("en-US")
      return (
        (todaysDateString === dateString ? "Today, " : dateString + ", ") +
        timeString
      )
    }

    m = Math.floor((timeInMilliseconds / 1000 / 60 / 60 - h) * 60)
    s = Math.floor(((timeInMilliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60)
    s < 10 ? (s = `0${s}`) : (s = `${s}`)
    m < 10 ? (m = `0${m}`) : (m = `${m}`)
    if (h < 1) {
      return `${m}:${s}`
    } else {
      return `${h}:${m}:${s}`
    }
  }

  async createGradeLevelMap() {
    const seniorsGradYear = Number(
      (await getDataFromRef("Dates/endDate")).split("-")[0]
    )
    var gradeLevelMap = {}
    gradeLevelMap[seniorsGradYear] = 12
    for (var i = seniorsGradYear + 1; i < seniorsGradYear + 6; i++) {
      gradeLevelMap[i] = gradeLevelMap[i - 1] - 1
    }
    return gradeLevelMap
  }

  render() {
    const student = this.props.student
    return (
      <div
        className={`student-pass-info ${this.props.checked ? " checked" : ""}`}
        onClick={() => this.props.onClick(this.props.student)}
      >
        <span className="custom-table-row-cell select-column">
          <div className="checkbox-container">
            <MyCheckbox
              checked={this.props.checked}
              name="checked"
              onChange={() => this.props.onClick(this.props.student)}
              className="student-pass-checkbox"
            />
          </div>
        </span>
        <span className="custom-table-row-cell id-column">
          {student.id.length === 1 ? student.id[0] : <a href="/">View All</a>}
        </span>
        <span className="custom-table-row-cell grade-column">
          {this.gradeLevel}
        </span>

        <span className="custom-table-row-cell name-column">
          {student.name}
        </span>
        <span className="custom-table-row-cell status-column">
          {student.currentStatus}
        </span>
        <span
          className="custom-table-row-cell updated-column"
          style={{
            color: this.state.colorStatus,
            fontWeight: this.state.weightStatus
          }}
        >
          {this.state.displayTime}
        </span>
        <span className="custom-table-row-cell log-column">
          <span className="log-link" onClick={this.openModal}>
            View <i className="material-icons">launch</i>
          </span>
        </span>
        <span className="custom-table-row-cell more-column">
          <span className="more-link">
            More
          </span>
        </span>
        <LogModal key={Math.random()} name={this.props.student.name} logDisplayed={this.state.logDisplayed} onCancel={this.closeModal} toggle={() => {}}/>
      </div>
    );
  }
}

export default StudentPassInfo
