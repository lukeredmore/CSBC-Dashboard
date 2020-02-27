import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";

import SchoolForm from '../my-components/SchoolForm'

const CSBCDashboard = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row className="page-header py-4">
      <PageTitle
        sm="4"
        title="Edit School Information"
        subtitle="App Dashboard"
        className="text-sm-left"
      />
    </Row>

    <Row>
      <Col lg="6">
        <SchoolForm title="Seton Catholic Central" identifier="seton" />
      </Col>
      <Col lg="6">
        <SchoolForm title="St. John School" identifier="john" />
      </Col>
      <Col lg="6">
        <SchoolForm title="All Saints School" identifier="saints" />
      </Col>
      <Col lg="6">
        <SchoolForm title="St. James School" identifier="james" />
      </Col>
    </Row>
  </Container>
)

export default CSBCDashboard
