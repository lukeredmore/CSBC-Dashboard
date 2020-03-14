import React from "react"

class StudentPassInfo extends React.Component {
  state = { displayTime: "", colorStatus: "black", weightStatus: 400}

  componentDidMount() {
    window.setInterval(() => {
      const newDisplayTime = this.getDisplayTime(
        new Date(this.props.student.timeOfStatusChange)
      )
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
    }, 1000)
  }

  getDisplayTime = dateChanged => {
    const timeInMilliseconds = new Date() - dateChanged
    let h, m, s
    h = Math.floor(timeInMilliseconds / 1000 / 60 / 60)

    if (h > 23) {
      const dateString = dateChanged.toLocaleDateString("en-US")
      const timeString = dateChanged.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York"
      })
      return dateString + ", " + timeString
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

  render() {
    const student = this.props.student
    return (
      <tr>
        <td>
          {student.id.length === 1 ? student.id[0] : <a href="/">View All</a>}
        </td>
        <td>{student.graduationYear}</td>

        <td>{student.name}</td>
        <td>{student.currentStatus}</td>
          <td style={{ color: this.state.colorStatus, fontWeight: this.state.weightStatus }}>
            {this.state.displayTime}
          </td>
        <td>
          <a href="/">
            View <i className="material-icons">launch</i>
          </a>
        </td>
      </tr>
    )
  }
}

export default StudentPassInfo
