import React from "react"
import {Container } from 'shards-react'
import PageTitle from '../my-components/PageTitle'
import AppAlertEditor from "../my-components/Alerts/AppAlertEditor"
import SendNotificationCard from "../my-components/Alerts/SendNotificationCard"

export default () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <PageTitle title="Alerts & Notifications" subtitle="App Dashboard" />

    <AppAlertEditor />

    <SendNotificationCard />
    </Container>
)
