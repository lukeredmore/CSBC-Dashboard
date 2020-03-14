import React from "react"
import './StudentPassInfo.scss'

import privateFiles from "../client-side-private-files.json"

import { getDataFromRef } from '../firebase'

class StudentPassInfo extends React.Component {
  state = { displayTime: "Loading...", colorStatus: "black", weightStatus: 400}
    interval = null
    gradeLevel = "-"

  async componentDidMount() {
    this.interval = window.setInterval(this.refreshTime, 1000)
    this.gradeLevel = (await this.createGradeLevelMap())[this.props.student.graduationYear]
  }

  refreshTime = () => {
      const signedOut = this.props.student.currentStatus.toLowerCase().includes('signed out')
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
      const newDisplayTime = this.getDisplayTime(new Date(this.props.student.timeOfStatusChange))
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
        weightStatus: weightStatus})
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
      return (todaysDateString === dateString ? "Today, " : dateString + ", ") + timeString
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
      const seniorsGradYear = Number((await getDataFromRef('Dates/endDate')).split('/')[0])
        var gradeLevelMap = {}
        gradeLevelMap[seniorsGradYear] = 12
        for (var i = seniorsGradYear + 1; i < seniorsGradYear + 6; i++) {
            gradeLevelMap[i] = gradeLevelMap[i - 1] - 1
        }
        console.log(gradeLevelMap)
        return gradeLevelMap
  }

    render() {
    const student = this.props.student
    return (
      <tr>
        <td>
          {student.id.length === 1 ? student.id[0] : <a href="/">View All</a>}
        </td>
        <td>{this.gradeLevel}</td>

        <td>{student.name}</td>
        <td>{student.currentStatus}</td>
        <td
          style={{
            color: this.state.colorStatus,
            fontWeight: this.state.weightStatus
          }}
        >
          {this.state.displayTime}
        </td>
        <td>
          <a href="/">
            View <i className="material-icons">launch</i>
          </a>
        </td>
        <td>
          <i className="material-icons toggle-icon" onClick={async () => {
              const url = privateFiles.FIREBASE_TOOGLE_FUNCTION_URL + "?studentIDNumber=" + student.id[0] + "&location=Manual Override&forceSign=toggle"
              const res = await fetch(url, {mode: "no-cors"})
                console.log(res)
          }}>
            360
          </i>
        </td>
      </tr>
    )
  }
}

export default StudentPassInfo
