import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../my-components/PageTitle";

import SchoolForm from "../my-components/SchoolForm";

const SchoolPage = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <PageTitle title="Edit School Information" subtitle="App Dashboard" />

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
);

export default SchoolPage;
