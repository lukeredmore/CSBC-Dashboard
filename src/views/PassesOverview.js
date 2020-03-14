import React from "react"
import { Container, Row, Col, Button, Card, CardHeader, CardBody } from "shards-react"

import PageTitle from "../components/common/PageTitle"

import StudentPassInfo from "../my-components/StudentPassInfo"

import { getContinuousDataFromRef } from "../firebase"

class PassesOverview extends React.Component {
  state = { allStudents: [], signedOutStudents: [] }

componentDidMount() {
    getContinuousDataFromRef("PassSystem/Students", students => {
        console.log(Object.values(students))
        this.setState({ 
            allStudents: Object.values(students),
            signedOutStudents: this.findSignedOutStudents(Object.values(students))
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
              <Col>
                <Card small className="mb-4">
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Students Currently Signed Out</h6>
                  </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <table className="table mb-0">
                      <thead className="bg-light">
                        <tr>
                          <th scope="col" className="border-0">
                            ID(s)
                          </th>
                          <th scope="col" className="border-0">
                            Grade
                          </th>
                          <th scope="col" className="border-0">
                            Name
                          </th>
                          <th scope="col" className="border-0">
                            Status
                          </th>
                          <th scope="col" className="border-0">
                            Last Updated
                          </th>
                          <th scope="col" className="border-0">
                            Log
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.signedOutStudents
                          .sort((first, second) => {
                            return (
                              new Date(first.timeOfStatusChange) -
                              new Date(second.timeOfStatusChange)
                            )
                          })
                          .map((student, i) => (
                            <StudentPassInfo key={i} student={student} />
                          ))}
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )
  }
}
export default PassesOverview