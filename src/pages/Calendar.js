import React from "react";
import { Container } from "shards-react";

import PageTitle from "../my-components/PageTitle";

import CalendarDatePicker from "../my-components/Calendar/StartEndDateEditor.js";
import DayViewer from "../my-components/Calendar/DayViewer"
import CalendarEditor from "../my-components/Calendar/CalendarEditor.jsx"

const Calendar = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <PageTitle title="Dates & Calendar" subtitle="App Dashboard" />
    Please use this page to see and modify the day schedule used by the app. That is, the day displayed here is sent to all app users in the form of a notification in the morning. A day listed as 'N/A' simply indicates no day schedule is observed that day, including weekends, days off and exam weeks.
    <DayViewer />
    <CalendarEditor />
    <CalendarDatePicker />
  </Container>
);

export default Calendar;
