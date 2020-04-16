import React from "react";
import { Button, Container, Row, Col } from "shards-react";

import PageTitle from '../my-components/PageTitle'

import CalendarDatePicker from '../my-components/Calendar/CalendarDatePicker.js'

const Calendar = () => (
  <Container fluid className="main-content-container px-4 pb-4">
          {/* Page Header */}
          <Row className="page-header py-4">
            <PageTitle
              sm="4"
              title="Dates & Calendar"
              subtitle="App Dashboard"
              className="text-sm-left"
            />
          </Row>
          <CalendarDatePicker />
    
  </Container>
);

export default Calendar;
