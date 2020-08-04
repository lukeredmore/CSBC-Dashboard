import React from "react";
import { Container, Row, Col, Alert } from "shards-react";

import PageTitle from "../my-components/PageTitle";

import SchedulePreview from "../my-components/Schedule/SchedulePreview";
import AddSchedulePreview from "../my-components/Schedule/AddSchedulePreview";
import ModifyScheduleModal from "../my-components/Schedule/ModifyScheduleModal";

import { getDataFromRef, writeToRef } from "../firebase";

class BellSchedule extends React.Component {
  state = {};

  async componentDidMount() {
    await this.pullStateFromFirebase();
  }

  ensureSomeScheduleIsChecked = () => {
    if (!this.scheduleExistsWithId(this.state.selectedID)) {
      this.setSelectedID(1);
    }
  };

  deleteSchedule = data => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete '" + data.title + "'?"
    );
    if (!shouldDelete) {
      return;
    }
    var array = Array.from(this.state.schedules);
    var index = array.indexOf(data);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ schedules: array }, async () => {
        this.modifyAndUpdateSchedule();
        this.ensureSomeScheduleIsChecked();
      });
    }
  };

  selectScheduleToEdit = data => {
    this.setState({
      currentlyEditing: data,
      originalTimes: Array.from(data.times)
    });
  };
  modifyAndUpdateSchedule = () => {
    //The new data's already in the state, so no parameters needed
    this.setState({ currentlyEditing: null });
    this.ensureSomeScheduleIsChecked();
    this.updateSchedulesInFirebase(this.state.schedules);
  };

  pullStateFromFirebase = async () => {
    const scheduleArray = await getDataFromRef("Schools/seton/schedules");
    const scheduleInUse = await getDataFromRef("Schools/seton/scheduleInUse");
    this.setState({
      schedules: scheduleArray,
      currentlyEditing: null,
      selectedID: scheduleInUse
    });
  };
  updateSchedulesInFirebase = async arr => {
    //data validation here
    let params = "Schools/seton/schedules";
    await writeToRef(params, arr);
    this.showAutoDismissAlert("Schedule updated successfully!");
  };

  setSelectedID = id => {
    if (id === this.state.selectedID) return;
    this.setState({ selectedID: id }, async () => {
      let params = "Schools/seton/scheduleInUse";
      await writeToRef(params, id);
      this.showAutoDismissAlert("Schedule selected successfully!");
      this.ensureSomeScheduleIsChecked();
    });
  };

  showAutoDismissAlert = message => {
    this.setState({ alertMessage: message }, () => {
      window.setTimeout(() => {
        this.setState({ alertMessage: null });
      }, 2500);
    });
  };

  createNewSchedule = () => {
    let name = window.prompt("Enter a name for this new schedule: ");
    if (!name || name === "" || name === " ") return;
    this.setState({
      currentlyEditing: {
        title: name,
        id: this.getNewId(),
        times: ["", "", "", "", "", "", "", "", "", ""]
      }
    });
  };

  getNewId = () => {
    const rand = Math.floor(Math.random() * 100);
    if (this.scheduleExistsWithId(rand)) {
      this.getNewId();
    } else {
      return rand;
    }
  };

  scheduleExistsWithId = idToCheck => {
    return (
      Array.from(this.state.schedules).filter(e => e.id === idToCheck)
        .length !== 0
    );
  };

  render() {
    return (
      <div>
        <Container fluid className="px-0">
          <Alert
            theme="success"
            open={this.state.alertMessage != null}
            className="mb-0"
          >
            <i className="fa fa-info mx-2"></i>
            {this.state.alertMessage}
          </Alert>
        </Container>
        <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <PageTitle title="Bell Schedule" subtitle="App Dashboard" />

          <div className="schedule-helper">
            Select a schedule for today. Note that the selected schedule will
            reset to the Regular Schedule every morning.
          </div>

          <Row>
            {this.state.schedules ? (
              this.state.schedules.map(e => (
                <Col md="6" lg="4" xl="3" key={e.id}>
                  <SchedulePreview
                    data={e}
                    name={e.id}
                    id={e.id}
                    key={e.id}
                    outlined={e.id === this.state.selectedID}
                    onClick={this.setSelectedID}
                    deletePressed={this.deleteSchedule}
                    editPressed={this.selectScheduleToEdit}
                    undeleteable={e.undeleteable}
                  />
                </Col>
              ))
            ) : (
              <div></div>
            )}
            <Col md="6" lg="4" xl="3">
              <AddSchedulePreview onClick={this.createNewSchedule} />
            </Col>
          </Row>
        </Container>
        <ModifyScheduleModal
          key={
            this.state.currentlyEditing ? this.state.currentlyEditing.id : null
          }
          data={this.state.currentlyEditing}
          onSubmit={this.modifyAndUpdateSchedule}
          onCancel={id => {
            let ogSchedules = this.state.schedules.map(e => {
              let copied = e;
              if (copied.id === id) copied.times = this.state.originalTimes;
              return copied;
            });
            this.setState({
              currentlyEditing: null,
              originalTimes: null,
              schedules: ogSchedules
            });
          }}
          toggle={() => {}}
        />
      </div>
    );
  }
}

export default BellSchedule;
