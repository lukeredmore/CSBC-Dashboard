import React from 'react'
import { Container } from 'shards-react'

import PageTitle from '../my-components/PageTitle'

import ReportIssue from '../my-components/Help/ReportIssue'

const HelpPage = () => (
  <Container fluid>
    <PageTitle title="Help & Support" subtitle="CSBC Dashboard" />
    <ReportIssue />
  </Container>
);

export default HelpPage