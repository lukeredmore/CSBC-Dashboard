import React from 'react'

import { Card, CardHeader, CardBody } from 'shards-react'
import StudentPassInfo from "../my-components/StudentPassInfo"

const StudentPassViewer = ({ title, data, emptyDataMessage }) => (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0 pb-3">
      <table className="table mb-0">
        <thead className="bg-light">
          <tr>
            <th scope="col" className="border-0">
              ID(s)
            </th>
            <th scope="col" className="border-0">
              Grade
            </th>
            <th scope="col" className="border-0">
              Name
            </th>
            <th scope="col" className="border-0">
              Status
            </th>
            <th scope="col" className="border-0">
              Last Updated
            </th>
            <th scope="col" className="border-0">
              Log
            </th>
            <th scope="col" className="border-0">
              Manual Toggle
            </th>
          </tr>
        </thead>

        {data.length > 0 ? (
          <tbody>
            {data.map((student, i) => (
              <StudentPassInfo key={i} student={student} />
            ))}
          </tbody>
        ) : null}
      </table>

      {data.length === 0 ? (
        <h5 style={{ textAlign: "center", marginTop: "16px", marginBottom: "0px" }}>{emptyDataMessage}</h5>
      ) : null}
    </CardBody>
  </Card>
)


export default StudentPassViewer