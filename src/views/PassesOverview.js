import React from "react"
import { Container, Row, Col, Button, Alert } from "shards-react"

import PageTitle from "../components/common/PageTitle"
import Papa from "papaparse"
import privateFiles from "../client-side-private-files.json"
import StudentPassesViewer from "../my-components/StudentPassesViewer"
import AddStudentModal from "../my-components/AddStudentModal.jsx"
import BannerAlert from "../my-components/BannerAlert"
import PlusButton from '../my-components/PlusButton'

import { getContinuousDataFromRef } from "../firebase"
import BatchStudentUploader from "../my-components/BatchStudentUploader"

class PassesOverview extends React.Component {
  state = {
    allStudents: [],
    signedOutStudents: [],
    currentlyAdding: null,
    alert: null
  }

  componentDidMount() {
    console.log("parsed")
    console.log(
      Papa.parse(`Student Name,Graduation Year,ID Number
Luke Redmore,2020,1234567890
James Red,2021,1234567891
"Adam, Ack",2022,1234567892`)
    )
    getContinuousDataFromRef("PassSystem/Students", students => {
      const fullArr = Object.values(students)
      this.setState({
        allStudents: fullArr.sort((first, second) => {
          let year = first.graduationYear - second.graduationYear
          if (year !== 0) return year
          let firstArr = first.name.split(" ")
          let name1 =
            firstArr.length > 1 ? firstArr[firstArr.length - 1] : firstArr[0]
          let secondArr = second.name.split(" ")
          let name2 =
            secondArr.length > 1
              ? secondArr[secondArr.length - 1]
              : secondArr[0]
          return name1.localeCompare(name2)
        }),
        signedOutStudents: this.findSignedOutStudents(fullArr).sort(
          (first, second) =>
            new Date(first.timeOfStatusChange) -
            new Date(second.timeOfStatusChange)
        )
      })
    })
  }

  findSignedOutStudents = fullArray => {
    return fullArray.filter(e =>
      e.currentStatus.toLowerCase().includes("signed out")
    )
  }

  addStudent = async student => {
    const url =
      privateFiles.FIREBASE_ADD_FUNCTION_URL +
      "?name=" +
      student.name +
      "&studentIDNumber=" +
      student.idNumber +
      "&graduationYear=" +
      student.graduationYear
    const res = await fetch(url)
    let body = await res.json()
    this.setState({
      currentlyAdding: null,
      alert: {
        message: body.error ? body.error : body.message,
        theme: body.error ? "danger" : "success"
      }
    })
  }

  render() {
    return (
      <div>
        <BannerAlert
          alert={this.state.alert}
          onAutoDismiss={() => this.setState({ alert: null })}
        />
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
            <Col xl="12">
              <StudentPassesViewer
                title="Students Currently Signed Out"
                data={this.state.signedOutStudents}
                emptyDataMessage="No students are signed out at this time"
              />
            </Col>
          </Row>

          <Row>
            <Col xl="12">
              <StudentPassesViewer
                title="All Students"
                data={this.state.allStudents}
                emptyDataMessage="No students found"
              >
                <PlusButton
                  onClick={() =>
                    this.setState({
                      currentlyAdding: {
                        shown: true,
                        name: "",
                        graduationYear: "",
                        idNumber: ""
                      }
                    })
                  }
                />
              </StudentPassesViewer>
            </Col>
          </Row>
          <Row>
            <Col>
              <BatchStudentUploader />
            </Col>
          </Row>
        </Container>
        <AddStudentModal
          key={Math.random()}
          data={this.state.currentlyAdding}
          onSubmit={async student => {
            await this.addStudent(student)
          }}
          onCancel={() => {
            this.setState({
              currentlyAdding: null
            })
          }}
          toggle={() => {}}
        />
      </div>
    )
  }
}
export default PassesOverview
