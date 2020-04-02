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
      onClick(id);
    }}
  >
    <Card small className={"schedule-preview" + (outlined ? " outlined" : "")}>
      <CardHeader>
        <h6 className="m-0">{data.title}</h6>
      </CardHeader>
      <div className="custom-border" />
      <div className="times-table">
        <Row form>
          {rearrange(data.times).map((time, index) => (
            <Col key={index} xs="6">
              {index !== 0 ? "Period " + time.period : "First Bell"}:{" "}
              {normalTimeFrom24HrTime(time.value)}
            </Col>
          ))}
        </Row>
      </div>
      <div className="custom-border" />
      <CardFooter>
        <div className="button-container">
          <i
            className="fa fa-edit icon-buttons edit"
            onClick={() => editPressed(data)}
          />
          {!undeleteable ? (
            <i
              className="fa fa-trash icon-buttons delete"
              onClick={() => deletePressed(data)}
            />
          ) : (
            <i />
          )}
        </div>
      </CardFooter>
    </Card>
  </div>
);


const normalTimeFrom24HrTime = strTime => {
    let comp = strTime.split(":")
    let hour = Number(comp[0])
    if (hour === 0) {
      return "12:" + comp[1] + " AM"
    } else if (hour === 12) {
      return "12:" + comp[1] + " PM"
    } else if (hour < 13) {
      return hour + ":" + comp[1] + " AM"
    } else {
      hour -= 12
      return hour + ":" + comp[1] + " PM"
    }
}

const rearrange = arrOg => {
  const arr = Array.from(arrOg)
  var firstHalf = arr.slice(0, arr.length / 2)
  var secondHalf = arr.slice(arr.length / 2, arr.length)
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    if(i % 2 === 0) {
      newArr.push({
        value: firstHalf.shift(),
        period: 4-firstHalf.length
      })
    } else {
      newArr.push({
        value: secondHalf.shift(),
        period: 9-secondHalf.length 
      })
    }
  }
  return newArr
}

export default SchedulePreview
