import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import "./OutstandingEmail.scss";
import {
  getContinuousDataFromRef,
  removeAtRef,
  pushToRef
} from "../../firebase";
import MinimalistInputField from "./MinimalistInputField";

class OutstandingEmail extends React.Component {
  state = {
    userEmails: [],
    emailToAdd: ""
  };

  componentDidMount() {
    getContinuousDataFromRef("PassSystem/EmailWhenOutstanding", emails =>
      this.setState({ userEmails: emails ? Object.entries(emails) : [] })
    );
  }

  deleteEmailWhenOustanding = key => {
    removeAtRef("PassSystem/EmailWhenOutstanding/" + key);
  };

  addEmailWhenOutstanding = e => {
    e.preventDefault();
    const { userEmails, emailToAdd } = this.state;
    if (userEmails.find(e => e[1] === emailToAdd))
      window.alert("This email is already included.")
    else
        pushToRef("PassSystem/EmailWhenOutstanding", emailToAdd);
    this.setState({ emailToAdd: "" });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="outstanding-email">
        <Card small>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Email-Notified Staff</h6>
          </CardHeader>

          <CardBody>
            These emails will receive more detailed information about students who have been out of class for more than 15 minutes compared to users simply receiving a push notification.
            {this.state.userEmails.map(([key, email]) => (
              <div key={key} className="existing-user-container">
                <span>{email}</span>
                <i
                  className="material-icons"
                  onClick={() => this.deleteEmailWhenOustanding(key)}
                >
                  clear
                </i>
              </div>
            ))}
            <form onSubmit={this.addEmailWhenOutstanding}>
              <div className="add-user-container">
                <MinimalistInputField
                  type="email"
                  name="emailToAdd"
                  autocomplete="off"
                  required
                  value={this.state.emailToAdd}
                  onChange={this.handleChange}
                />
                <button type="submit" className='add-user-plus-button'><i
                  className="material-icons"
                >add</i></button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default OutstandingEmail;
