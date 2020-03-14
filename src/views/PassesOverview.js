import React from "react"
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react"

import PageTitle from "../components/common/PageTitle"

import StudentPassesViewer from "../my-components/StudentPassesViewer"

import { getContinuousDataFromRef } from "../firebase"

class PassesOverview extends React.Component {
  state = { allStudents: [], signedOutStudents: [] }

componentDidMount() {
    getContinuousDataFromRef("PassSystem/Students", students => {
        const fullArr = Object.values(students)
        this.setState({
          allStudents: fullArr.sort((first, second) => {
              let year = first.graduationYear - second.graduationYear
              if (year !== 0) return year
              let firstArr = first.name.split(" ")
              let name1 = firstArr.length > 1 ? firstArr[firstArr.length - 1] : firstArr[0]
              let secondArr = second.name.split(" ")
              let name2 = secondArr.length > 1 ? secondArr[secondArr.length - 1] : secondArr[0]
            return name1.localeCompare(name2)
          }),
          signedOutStudents: this.findSignedOutStudents(fullArr).sort((first, second) => (
                new Date(first.timeOfStatusChange) - new Date(second.timeOfStatusChange)
              )
          )
        })
    })
}

findSignedOutStudents = fullArray => {
    return fullArray.filter(e=> e.currentStatus.toLowerCase().includes('signed out'))
}

  render() {
      return (
        <div>
          <Container fluid className="main-content-container px-4 pb-4">
            {/* Page Header */}
            <Row className="page-header py-4">
              <PageTitle
                sm="4"
                title="Passes Overview"
                subtitle="App Dashboard"
                className="text-sm-left"
              />
            </Row>
            <p>
              Use this page to view and manage all students using NFC-enabled
              passes. Click{" "}
              <a
                href="https://csbcpasses.herokuapp.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                here
              </a>{" "}
              to visit the site that the NFC readers use to sign students in and
              out.
            </p>
            <Row>
              <Col xl='12'>
                <StudentPassesViewer
                  title="Students Currently Signed Out"
                  data={this.state.signedOutStudents}
                  emptyDataMessage='No students are signed out at this time'
                />
              </Col>
              <Col xl='12'>
                <StudentPassesViewer
                  title="All Students"
                  data={this.state.allStudents}
                  emptyDataMessage="No students found"
                />
              </Col>
            </Row>
          </Container>
        </div>
      )
  }
}
export default PassesOverview