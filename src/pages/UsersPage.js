import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../my-components/PageTitle";
import UsersViewer from "../my-components/Users/UsersViewer";

const UsersPage = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <PageTitle title="Users" subtitle="Dashboard" />

    <Row>
      <Col lg="12" md="12">
        <UsersViewer />
      </Col>
    </Row>
  </Container>
);

export default UsersPage;
