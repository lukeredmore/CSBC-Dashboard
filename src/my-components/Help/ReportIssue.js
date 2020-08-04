import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormTextarea,
  Button
} from "shards-react";

import constants from "../../client-side-private-files.json";
import "./ReportIssue.scss";
import { sendPostRequest } from "../../firebase";
import { connect } from "react-redux";

const ReportIssue = ({ senderEmail, senderName }) => {
  const [reportText, setReportText] = useState("");
  return (
    <div className="report-issue">
      <Card>
        <CardHeader className="border-bottom">
          <h5>Ask a Question / Report an Issue</h5>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={e =>
              sendReportEmail(e, senderName, senderEmail, reportText)
            }
          >
            <label for="report-text">
              Please describe your issue in the box below. Note that your email
              may be recorded for any follow-up questions.
            </label>
            <FormTextarea
              className="mt-2"
              value={reportText}
              required
              id="report-text"
              rows={8}
              onChange={e => setReportText(e.target.value)}
            />
            <Button block className="mt-3">Send</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

const sendReportEmail = async (
  e,
  senderName,
  senderEmail,
  message
) => {
  e.preventDefault();
  const body = { senderName, subject: "CSBC Dashboard Support", message, senderEmail };
  let res = await sendPostRequest(
    constants.FIREBASE_SEND_REPORT_EMAIL_FUNCTION_URL,
    body
  );
  console.log(res);
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  senderEmail: currentUser ? currentUser.email : null,
  senderName: currentUser ? currentUser.displayName : null
});

export default connect(mapStateToProps)(ReportIssue);
