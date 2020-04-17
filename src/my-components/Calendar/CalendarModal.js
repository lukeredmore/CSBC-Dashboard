import React from "react";

import { Modal, Button } from "shards-react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import "./CalendarModal.scss";

class CalendarModal extends React.Component {
  state = {
    selectedDates: []
  };

  componentDidMount() {
      if (!this.props.selectedDates) return
      this.setState({ selectedDates: this.props.selectedDates });
  }

  onDayClick = (date, modifiers) => {
    if (modifiers.disabled) return
    let dates = this.state.selectedDates;
    let dateString = date.toISOString().split("T")[0]
    let filteredArray = dates.filter(e => e !== dateString);
    if (filteredArray.length !== dates.length) {
      this.setState({ selectedDates: filteredArray });
    } else {
      this.setState({ selectedDates: [...dates, dateString] });
    }
  };

  render() {
    if (this.props.selectedDates)
      return (
        <div className="calendar-modal">
          <Modal open>
            <div className="header border-bottom">
              <h5>Select dates:</h5>
              <div className="button-container">
                <Button
                  theme="danger"
                  onClick={() => this.props.onClose(this.props.selectedDates)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => this.props.onClose(this.state.selectedDates)}
                >
                  Save
                </Button>
              </div>
            </div>
            <DayPicker
              canChangeMonth={false}
              numberOfMonths={10}
              initialMonth={new Date(this.props.startDate + "T14:00:00.000Z")}
              disabledDays={[
                { daysOfWeek: [0, 6] },
                {
                  after: new Date(this.props.endDate + "T14:00:00.000Z"),
                  before: new Date(this.props.startDate + "T14:00:00.000Z")
                }
              ]}
              selectedDays={this.state.selectedDates.map(
                e => new Date(e + "T14:00:00.000Z")
              )}
              onDayClick={this.onDayClick}
            />
          </Modal>
        </div>
      );
    else return null;
  }
}
export default CalendarModal;
