import React from "react";
import { Container } from "shards-react";

import PageTitle from "../my-components/PageTitle";

import CalendarDatePicker from "../my-components/Calendar/CalendarDatePicker.js";

const Calendar = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <PageTitle title="Dates & Calendar" subtitle="App Dashboard" />
    <CalendarDatePicker />
  </Container>
);

export default Calendar;
