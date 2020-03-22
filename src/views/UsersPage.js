import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UsersViewer from "../my-components/Users/UsersViewer";

const UsersPage = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Users"
        subtitle="Dashboard"
        className="text-sm-left"
      />
    </Row>

    <Row>
      <Col lg="12" md="12">
        <UsersViewer />
      </Col>
    </Row>
  </Container>
);

export default UsersPage;
