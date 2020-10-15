import React from "react";



// import MyCheckbox from '../my-components/MyCheckbox'
import { Button } from 'shards-react'
// import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

import { getDataFromRef, writeToRef } from "../firebase";

import "./Todo.scss";
import CalendarModal from "../my-components/Calendar/CalendarModal"

class Todo extends React.Component {
  state = {
    checked: true,
    selectedDates: null
  }

  toggle = () => this.setState({ checked: !this.state.checked})

  getDates = async () => {
    let data = await getDataFromRef("Dates/noSchool")
    console.log(data)
    this.setState({selectedDates: data})
  }
  onModalClose = async (data) => {
    console.log(data)
    this.setState({selectedDates: null})
    await writeToRef("Dates/noSchool", data)
  }

  render() {
    return (
      <div className="todo">
        <h1>
          add note to double check schedule times, add helper instructions for
          batch upload
        </h1>
        <CalendarModal key={Math.random()} selectedDates={this.state.selectedDates} onClose={this.onModalClose}/>
        <Button onClick={this.getDates}>Open Modal</Button>
      </div>
    );
  }
}
export default Todo;
