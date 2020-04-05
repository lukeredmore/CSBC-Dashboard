import React from "react"
import "./StudentPassesViewer.scss"
import { Card, CardHeader, CardBody } from "shards-react"
import StudentPassInfo from "./StudentPassInfo"

import privateFiles from "../../client-side-private-files.json"

import ExpandableSearchField from "./ExpandableSearchField";
import ButtonIcon from "./ButtonIcon"
import StudentPassHeader from "./StudentPassHeader"
import { sendAuthenticatedRequest } from "../../firebase"

class StudentPassViewer extends React.Component {
  state = {
    searchValue: "",
    checkedStudents: []
  }

  toggleCheckedStateOfItem = student => {
    if (!this.state.checkedStudents.includes(student)) {
      this.setState({
        checkedStudents: [student, ...this.state.checkedStudents]
      })
    } else {
      const arr = Array.from(this.state.checkedStudents).filter(
        e => e.id[0] !== student.id[0]
      )
      this.setState({ checkedStudents: arr })
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  toggleCheckedItems = () => {
    this.state.checkedStudents.forEach(async e => {
      const url =
        privateFiles.FIREBASE_TOOGLE_FUNCTION_URL +
        "?studentIDNumber=" +
        e.id[0] +
        "&location=Manual Override&forceSign=toggle"
      let response = await sendAuthenticatedRequest(url);
      console.log(response)
    })
    this.batchButtonCompletion()
  }

  deleteCheckedItems = () => {
    const count = this.state.checkedStudents.length
    if (!window.confirm(`Are you sure you want to delete these ${count} students? This cannot be undone.`)) return
      let studentsWithErrors = []
      let finishedCounter = 0
      this.state.checkedStudents.forEach(async e => {
        const url = `${privateFiles.FIREBASE_DELETE_FUNCTION_URL}?studentIDNumber=${e.id[0]}`
        const res = await fetch(url)
        let body = await res.json()
        finishedCounter++
        if (body.error) studentsWithErrors.push(e.name)
        if (finishedCounter === this.state.checkedStudents.length) {
          const alertMessage = studentsWithErrors.length > 0
              ? `The following students failed to delete: ${studentsWithErrors.join(", ")}`
              : `${count} students deleted.`
          window.setTimeout(() => this.batchButtonCompletion(alertMessage), 500)
        }
      })
  }

  batchButtonCompletion = message => {
    this.setState({ checkedStudents: [], searchValue: "" })
    if (message) window.alert(message)
  }

  render() {
    const { title, data, emptyDataMessage, children } = this.props

    const displayedData = data.filter(
      e =>
        e.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
        String(e.id).includes(this.state.searchValue) ||
        e.currentStatus
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase()) ||
        String(e.graduationYear).includes(this.state.searchValue)
    )

    return (
      <Card small className="mb-4 student-passes-viewer">
        <CardHeader className="border-bottom" style={{ paddingTop: "5px" }}>
          <h6 style={{ display: "inline", verticalAlign: "middle" }}>
            {title}
          </h6>

          <ExpandableSearchField
            type="text"
            label="Search"
            name="searchValue"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          {children}
          <IconTray
            className="icon-tray"
            toggle={this.toggleCheckedItems}
            edit={() => {}}
            remove={this.deleteCheckedItems}
          />
        </CardHeader>
        <CardBody className="p-0 pb-3">
          <div className="table mb-0">
            <StudentPassHeader
              selectAddendum={
                this.state.checkedStudents.length > 0
                  ? ` (${this.state.checkedStudents.length})`
                  : ""
              }
            />

            {displayedData.length > 0 ? (
              <div
                style={{
                  display: "block",
                  overflowY: "auto",
                  overflowX: "hidden",
                  height:
                    displayedData.length * 44 + 10 > 300
                      ? "300px"
                      : `${displayedData.length * 47 + 10}px`,
                  width: "100%"
                }}
              >
                {displayedData.map(student => (
                  <StudentPassInfo
                    key={student.id[0]}
                    student={student}
                    checked={this.state.checkedStudents.includes(student)}
                    onClick={this.toggleCheckedStateOfItem}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {displayedData.length === 0 && !this.state.loading ? (
            <h5 className="empty-data-text">{emptyDataMessage}</h5>
          ) : (
            <IconTray
              className="bottom-tray"
              toggle={this.toggleCheckedItems}
              edit={() => {}}
              remove={this.deleteCheckedItems}
            />
          )}
        </CardBody>
      </Card>
    );
  }
}

const IconTray = ({ toggle, edit, remove, className }) => (
  <span className={className}>
    <ButtonIcon icon="360" title="Manual Toggle" onClick={toggle} />
    <ButtonIcon icon="edit" title="Edit" onClick={edit} />
    <ButtonIcon
      icon="delete"
      title="Remove"
      onClick={remove}
    />
  </span>
)

export default StudentPassViewer
