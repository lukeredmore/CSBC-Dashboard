import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormInput,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "shards-react";

import {
  writeToRef,
  getContinuousDataFromRef
} from "../../firebase";
import CalendarModal from "./CalendarModal";

import LoadingSymbol from "../Login/LoadingSymbol";

import "./CalendarDatePicker.scss";

class CalendarDatePicker extends React.Component {
  state = {
    selectedDates: null,
    dates: null,
    currentlyEditing: ""
  };

  componentDidMount() {
    getContinuousDataFromRef("Dates", dates => {
      this.setState({ dates });
    });
  }

  onModalClose = async data => {
    await writeToRef("Dates/" + this.state.currentlyEditing, data);
    this.setState({ selectedDates: null, currentlyEditing: "" });
  };

  render() {
    if (this.state.dates) {
      const {
        noElementarySchoolDays,
        noHighSchoolDays,
        noSchoolDays
      } = this.state.dates;
      return (
        <div className="calendar-date-picker">
          <Card>
            <CardHeader className="border-bottom">
              <h5 style={{ margin: "0" }}>Edit No School Days</h5>
            </CardHeader>
            <CardBody>
              <div className="dates-group">
                No school days (Holidays, In-Service Days, etc.)
                <div
                  className="dates-form-container"
                  onClick={() =>
                    this.setState({
                      selectedDates: noSchoolDays ? noSchoolDays : [],
                      currentlyEditing: "noSchoolDays"
                    })
                  }
                >
                  <InputGroup>
                    <FormInput
                      disabled
                      value={noSchoolDays ? noSchoolDays.join(", ") : ""}
                    />
                    <InputGroupAddon type="append">
                      <InputGroupText>
                        <i className="material-icons">launch</i>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
              <div className="dates-group">
                No high school days (Midterms, Finals, etc.)
                <div
                  className="dates-form-container"
                  onClick={() =>
                    this.setState({
                      selectedDates: noHighSchoolDays ? noHighSchoolDays : [],
                      currentlyEditing: "noHighSchoolDays"
                    })
                  }
                >
                  <InputGroup>
                    <FormInput
                      disabled
                      value={noHighSchoolDays ? noHighSchoolDays.join(", ") : ""}
                    />
                    <InputGroupAddon type="append">
                      <InputGroupText>
                        <i className="material-icons">launch</i>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
              <div className="dates-group">
                No elementary school days (Parent-Teacher Conferences, etc.)
                <div
                  className="dates-form-container"
                  onClick={() =>
                    this.setState({
                      selectedDates: noElementarySchoolDays ? noElementarySchoolDays : [],
                      currentlyEditing: "noElementarySchoolDays"
                    })
                  }
                >
                  <InputGroup>
                    <FormInput
                      disabled
                      value={
                        noElementarySchoolDays
                          ? noElementarySchoolDays.join(", ")
                          : ""
                      }
                    />
                    <InputGroupAddon type="append">
                      <InputGroupText>
                        <i className="material-icons">launch</i>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </div>
            </CardBody>
          </Card>
          <CalendarModal
            key={Math.random()}
            selectedDates={this.state.selectedDates}
            onClose={this.onModalClose}
          />
        </div>
      );
    } else return <LoadingSymbol />;
  }
}
export default CalendarDatePicker;
