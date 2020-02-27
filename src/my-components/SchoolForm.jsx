import React from "react"
import {
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  FormInput,
  Button,
  FormTextarea,
  FormCheckbox
} from "shards-react"

import "./SchoolForm.css"
import { getDataFromRef, writeToRef } from "../firebase"

class SchoolForm extends React.Component {
  state = {
    principal: "",
    email: "",
    phone: "",
    fax: "",
    hoo: "",
    lunchURL: "",
    autoURLUpdateEnabled: true
  }
  handleChange = event => {
    console.log(event.target)
    const { value, name } = event.target
    this.setState({ [name]: value })
  }
  handleCheck = name => {
    const value = !this.state[name]
    console.log(value)
    this.setState({ [name]: value })
  }
  handleSubmit = async event => {
    event.preventDefault()
    try {
      await this.updateFirebase()
    } catch (e) {
      console.log(e)
    }
  }
  pullStateFromFirebase = async () => {
    let query = this.props.identifier
    let response = await getDataFromRef("Schools/" + query)
    console.log(response)
    this.setState( response )
  }
  updateFirebase = async () => {
    //data validation here
    let params = 'Schools/' + this.props.identifier
    let data = this.state
    await writeToRef(params, data)
    alert("Data successfully updated")
  }

  async componentDidMount() {
    await this.pullStateFromFirebase()
  }

  formatPhone = event => {
    var value = event.target.value
    var num = value.replace(/\D/g, "")
    if (num.length === 0) {
      value = ""
    } else if (num.length <= 3) {
      value = "(" + num
    } else if (num.length <= 6) {
      value = "(" + num.substring(0, 3) + ") " + num.substring(3, 6)
    } else {
      value =
        "(" +
        num.substring(0, 3) +
        ") " +
        num.substring(3, 6) +
        "-" +
        num.substring(6, 10)
    }
    event.target.value = value
    this.handleChange(event)
  }
  render() {
    return (
      <Card small className="school-form">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{this.props.title}</h6>
        </CardHeader>
        <Form className="card-form" onSubmit={this.handleSubmit}>
          <Row form>
            <Col md="6" className="form-group">
              <label>Principal</label>
              <i className="fa fa-asterisk fa-xs" />
              <FormInput
                type="text"
                name="principal"
                placeholder="Principal"
                value={this.state.principal}
                onChange={this.handleChange}
                required
              />
            </Col>
            <Col md="6" className="form-group">
              <label>Contact Email(s)</label>
              <i className="fa fa-asterisk fa-xs" />
              <small> (Separate with commas)</small>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </Col>
            <Col md="6" className="form-group">
              <label>Main Phone</label>
              <i className="fa fa-asterisk fa-xs" />
              <FormInput
                type="tel"
                name="phone"
                placeholder="(123) 456-7890"
                value={this.state.phone}
                onChange={this.formatPhone}
                required
              />
            </Col>
            <Col md="6" className="form-group">
              <label>Fax</label>
              <FormInput
                type="tel"
                name="fax"
                placeholder="(123) 456-7890"
                value={this.state.fax}
                onChange={this.formatPhone}
              />
            </Col>
          </Row>

          <Row form>
            <Col className="form-group">
              <label>Hours of Operation</label>
              <i className="fa fa-asterisk fa-xs" />
              <FormTextarea
                rows="5"
                name="hoo"
                value={this.state.hoo}
                onChange={this.handleChange}
                required
              />
            </Col>
          </Row>

          <Row form>
            <Col md="12">
              <label>Lunch Menu URL</label>
              <i className="fa fa-asterisk fa-xs" />
              <small> (Must end in .doc or .pdf)</small>
              <FormInput
                type="url"
                name="lunchURL"
                value={this.state.lunchURL}
                onChange={this.handleChange}
                required
              />
            </Col>
            <Col md="12" className="form-group">
              <label>
                Check here to automatically update the lunch menu
                each month
              </label>
              <FormCheckbox
                className="form-check"
                inline
                checked={this.state.autoURLUpdateEnabled}
                onChange={() => {
                  this.handleCheck("autoURLUpdateEnabled")
                }}
              />
            </Col>
          </Row>

          <div className="btn-form">
            <Button type="submit" theme="success">
              <i className="fa fa-upload" /> Update
            </Button>
          </div>
          <div className="btn-form">
            <Button onClick={this.pullStateFromFirebase} theme="dark">
              <i className="fa fa-undo" /> Revert
            </Button>
          </div>
        </Form>
      </Card>
    )
  }
}

export default SchoolForm
