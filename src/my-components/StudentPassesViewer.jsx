import React from "react"
import "./StudentPassesViewer.scss"
import { Card, CardHeader, CardBody } from "shards-react"
import StudentPassInfo from "./StudentPassInfo"

import MinimalistInputField from './MinimalistInputField'

class StudentPassViewer extends React.Component {
state = {
    searchValue: ""
}

handleChange = e => {
    const {name, value} = e.target
    this.setState({ [name]: value })
}

  render() {
    const { title, data, emptyDataMessage, children } = this.props

    const displayedData = data.filter(
      e =>
        e.name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
        String(e.id).includes(this.state.searchValue) ||
        e.currentStatus.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
        String(e.graduationYear).includes(this.state.searchValue)
    )

    return (
      <Card small className="mb-4 student-passes-viewer">
        <CardHeader
          className="border-bottom"
          style={{ paddingTop: "5px"}}
        >
          <h6 style={{ display: "inline", verticalAlign: "middle" }}>
            {title}
          </h6>
          <MinimalistInputField
            type="text"
            label="Search"
            name="searchValue"
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          {children}
        </CardHeader>
        <CardBody className="p-0 pb-3">
          <table className="table mb-0">
            <div
              className="bg-light"
              style={{ borderBottom: "1px solid #e1e5eb" }}
            >
              <span
                className="custom-table-header-cell"
                style={{ width: "16%" }}
              >
                ID(s)
              </span>
              <span
                className="custom-table-header-cell"
                style={{ width: "5%" }}
              >
                Grade
              </span>
              <span
                className="custom-table-header-cell"
                style={{ width: "17%" }}
              >
                Name
              </span>
              <span
                className="custom-table-header-cell"
                style={{ width: "24%" }}
              >
                Status
              </span>
              <span
                className="custom-table-header-cell"
                style={{ width: "16%" }}
              >
                Last Updated
              </span>
              <span
                className="custom-table-header-cell"
                style={{ width: "10%" }}
              >
                Log
              </span>
              <span
                className="custom-table-header-cell"
                style={{ width: "12%" }}
              >
                Manual Toggle
              </span>
            </div>

            {displayedData.length > 0 ? (
              <tbody
                style={{
                  display: "block",
                  overflowY: "auto",
                  height:
                    displayedData.length * 44 + 10 > 300
                      ? "300px"
                      : `${displayedData.length * 44 + 10}px`,
                  width: "100%"
                }}
              >
                {displayedData.map((student, i) => (
                  <StudentPassInfo key={student.id[0]} student={student} />
                ))}
              </tbody>
            ) : null}
          </table>

          {displayedData.length === 0 ? (
            <h5
              style={{
                textAlign: "center",
                marginTop: "16px",
                marginBottom: "0px"
              }}
            >
              {emptyDataMessage}
            </h5>
          ) : null}
        </CardBody>
      </Card>
    )
  }
}

export default StudentPassViewer
