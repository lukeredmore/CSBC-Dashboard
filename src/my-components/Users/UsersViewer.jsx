import React from "react"
import "./UsersViewer.scss";

import { Card, CardBody, CardHeader } from "shards-react"
import { getContinuousDataFromRef } from "../../firebase"
import PlusButton from "../Passes/PlusButton"
import AddUserModal from "./AddUserModal"
import ExpandableSearchField from "../Passes/ExpandableSearchField";
import constants from '../../constants.json'

class UsersViewer extends React.Component {
  state = {
    users: [],
    currentlyEditing: null,
    searchValue: ""
  }

  componentDidMount() {
    getContinuousDataFromRef("Users", arr => {
        this.setState({ users: Object.entries(arr)})
    })
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  render() {
      const objectToSend = this.state.currentlyEditing
        ? {
            [this.state.currentlyEditing[0]]: {
              ...this.state.currentlyEditing[1]
            }
          }
        : null

        const usersToDisplay =
          this.state.users.length > 0
            ? this.state.users.filter(
                e =>
                  e[1].name.toLowerCase().includes(this.state.searchValue.toLowerCase()) ||
                  e[1].email.toLowerCase().includes(this.state.searchValue.toLowerCase())
              ).sort((a, b) => a[1].name.localeCompare(b[1].name))
            : [];
    return (
      <div className="admin-users">
        <Card small>
          <CardHeader className="border-bottom">
            <h6 className="m-0">Administrators and Teachers</h6>
            <PlusButton
              className="add-user"
              onClick={() => {
                const name = prompt("Please enter a name for this user:");
                if (name)
                  this.setState({
                    currentlyEditing: [
                      null,
                      {
                        name: name,
                        toggleAccess: true,
                        passAccess: true,
                        notifyOutstanding: true,
                        dashboardAccess: false,
                        notificationSchool: null
                      }
                    ]
                  });
              }}
            />
            <span className="search-field-container">
              <ExpandableSearchField
                value={this.state.searchValue}
                onChange={this.handleChange}
                name="searchValue"
              />
            </span>
            <p className="mb-0">
              Click the plus to add a new user, or click any existing user to
              edit.
            </p>
          </CardHeader>
          <CardBody className="user-card-body">
            <table className="user-table">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    Email
                  </th>
                  <th scope="col" className="border-0">
                    Toggle Students
                  </th>
                  <th scope="col" className="border-0">
                    Access Basic Pass Info
                  </th>
                  <th scope="col" className="border-0">
                    Notify Of Outstanding Students
                  </th>
                  <th scope="col" className="border-0">
                    Access Full Dashboard
                  </th>
                  <th scope="col" className="border-0">
                    Can Send Notifications To
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersToDisplay.map(([key, val]) => (
                  <tr
                    key={key}
                    className="user-row"
                    onClick={() => {
                      this.setState({ currentlyEditing: [key, val] });
                    }}
                  >
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>
                      <i
                        className={
                          "material-icons " +
                          (val.toggleAccess ? "allowed" : "not-allowed")
                        }
                      >
                        fiber_manual_record
                      </i>
                    </td>
                    <td>
                      <i
                        className={
                          "material-icons " +
                          (val.passAccess ? "allowed" : "not-allowed")
                        }
                      >
                        fiber_manual_record
                      </i>
                    </td>
                    <td>
                      <i
                        className={
                          "material-icons " +
                          (val.notifyOutstanding ? "allowed" : "not-allowed")
                        }
                      >
                        fiber_manual_record
                      </i>
                    </td>
                    <td>
                      <i
                        className={
                          "material-icons " +
                          (val.dashboardAccess ? "allowed" : "not-allowed")
                        }
                      >
                        fiber_manual_record
                      </i>
                    </td>
                    <td>
                      {val.notificationSchool
                        ? constants.SCHOOL_NAMES[val.notificationSchool]
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
        {objectToSend ? (
          <AddUserModal
            key={Math.random()}
            data={objectToSend}
            onClose={() => this.setState({ currentlyEditing: null })}
            toggle={() => {}}
          />
        ) : null}
      </div>
    );
  }
}



export default UsersViewer;
