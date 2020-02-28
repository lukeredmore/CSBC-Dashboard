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
              {index + 1}. {time}
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

export default SchedulePreview
