import React from "react"
import { Container, Row, Col } from "shards-react"

import PageTitle from "../components/common/PageTitle"

import SchedulePreview from "../my-components/SchedulePreview"
import AddSchedulePreview from "../my-components/AddSchedulePreview"

class BellSchedule extends React.Component {
  state = {
    schedules: [
      {
        title: "Regular Schedule",
        id: "1",
        times: [
          "8:08 AM",
          "8:59 AM",
          "9:44 AM",
          "10:29 AM",
          "11:14 AM",
          "11:59 AM",
          "12:44 PM",
          "1:29 PM",
          "2:14 PM",
          "3:00 PM"
        ],
        undeleteable: true
      },
      {
        title: "Mass Schedule",
        id: "2",
        times: [
          "8:08 AM",
          "8:59 AM",
          "9:44 AM",
          "10:29 AM",
          "11:14 AM",
          "11:59 AM",
          "12:44 PM",
          "1:29 PM",
          "2:14 PM",
          "3:00 PM"
        ]
      },
      {
        title: "House Meeting Schedule",
        id: "3",
        times: [
          "8:08 AM",
          "8:59 AM",
          "9:44 AM",
          "10:29 AM",
          "11:14 AM",
          "11:59 AM",
          "12:44 PM",
          "1:29 PM",
          "2:14 PM",
          "3:00 PM"
        ]
      },
      {
        title: "2 Hour Delay Schedule",
        id: "4",
        times: [
          "8:08 AM",
          "8:59 AM",
          "9:44 AM",
          "10:29 AM",
          "11:14 AM",
          "11:59 AM",
          "12:44 PM",
          "1:29 PM",
          "2:14 PM",
          "3:00 PM"
        ]
      }
    ],
    selectedID: "1"
  }

  ensureSomeScheduleIsChecked = () => {
if (
  Array.from(this.state.schedules).filter(e => e.id === this.state.selectedID)
    .length === 0
) {
  this.setState({ selectedID: "1" })
}
  }

  deleteSchedule = data => {
    const shouldDelete = window.confirm("Are you sure you want to delete '" + data.title + "'?")
    if (!shouldDelete) { return }
    var array = Array.from(this.state.schedules)
    var index = array.indexOf(data)
    if (index !== -1) {
      array.splice(index, 1)
      this.setState({ schedules: array }, this.ensureSomeScheduleIsChecked)
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row className="page-header py-4">
          <PageTitle
            sm="4"
            title="Bell Schedule"
            subtitle="App Dashboard"
            className="text-sm-left"
          />
        </Row>

        <div className="schedule-helper">
          Select a schedule for today. Note that the selected schedule will
          reset to the Regular Schedule every morning.
        </div>

        <Row>
          {this.state.schedules.map(e => (
            <Col md="6" lg="4" xl="3" key={e.id}>
              <SchedulePreview
                data={e}
                name={e.id}
                id={e.id}
                key={e.id}
                outlined={e.id === this.state.selectedID}
                onClick={name => {
                  this.setState({ selectedID: name }, this.ensureSomeScheduleIsChecked)
                }}
                deletePressed={this.deleteSchedule}
                undeleteable={e.undeleteable}
              />
            </Col>
          ))}
          <Col md="6" lg="4" xl="3">
            <AddSchedulePreview />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default BellSchedule
