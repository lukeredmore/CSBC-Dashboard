import React from "react";
import { Container } from "shards-react";

import PageTitle from "../my-components/PageTitle";

import CovidSettings from "../my-components/Covid/CovidSettings"

const CovidPage = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <PageTitle title="COVID-19 Settings" subtitle="App Dashboard" />

<CovidSettings />

  </Container>
);

export default CovidPage;
