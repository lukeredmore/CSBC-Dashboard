import "./SchedulePreview.scss"

import React from "react"
import { Col, Row, Card, CardHeader, CardFooter } from "shards-react"

const SchedulePreview = ({
  data,
  id,
  outlined,
  onClick,
  deletePressed,
  editPressed,
  undeleteable
}) => (
  <div
    onClick={() => {
      onClick(id)
    }}
  >
    <Card small className={"schedule-preview" + (outlined ? " outlined" : "")}>
      <CardHeader className="border-bottom">
        <h6 className="m-0">{data.title}</h6>
      </CardHeader>
      <div className="times-table">
        <Row form>
          {data.times.map((time, index) => (
            <Col key={index} xs="6">
              {index + 1}. {normalTimeFrom24HrTime(time)}
            </Col>
          ))}
        </Row>
      </div>
      <CardFooter className="border-top">
        <div className="button-container">
          <i className="fa fa-edit icon-buttons edit" onClick={() => {
            editPressed(data)
          }} />
          {!undeleteable ?
          <i
            className="fa fa-trash icon-buttons delete"
            onClick={() => {
              deletePressed(data)
            }}
          />
           : <i/>}
        </div>
      </CardFooter>
    </Card>
  </div>
)

const normalTimeFrom24HrTime = strTime => {
  let comp = strTime.split(":")
  let hour = Number(comp[0])
  if (hour < 13) {
    return hour + ":" + comp[1] + " AM"
  } else {
    hour -= 12
    return hour + ":" + comp[1] + " PM"
  }
}

export default SchedulePreview
