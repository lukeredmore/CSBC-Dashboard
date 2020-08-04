import React from "react";
import "./CovidSettings.scss";
import { Card, CardBody } from "shards-react";
import MyCheckbox from "../MyCheckbox";
import { writeToRef, getContinuousDataFromRef } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";

export default () => {
  const [showCovidCheckIn, setShowCovidCheckIn] = useState(false);

  const setShowCovidCheckInRef = useState(null)[1];

  useEffect(() => {
    setShowCovidCheckInRef(
      getContinuousDataFromRef("Schools/general/showCovidCheckIn", val =>
        setShowCovidCheckIn(val)
      )
    )
    return setShowCovidCheckInRef(null)
    }, []);

  return (
    <div className="covid-settings">
      <Card>
        <CardBody>
          <div className='item-row'>
            Show Check-In Questionnaire On CSBC App:
            <MyCheckbox
              checked={showCovidCheckIn}
              onChange={() =>
                writeToRef(
                  "Schools/general/showCovidCheckIn",
                  !showCovidCheckIn
                )
              }
            />{" "}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
