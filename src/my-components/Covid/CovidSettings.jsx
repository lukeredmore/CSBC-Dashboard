import React from "react";
import "./CovidSettings.scss";
import { Card, CardBody } from "shards-react";
import MyCheckbox from "../MyCheckbox";
import { writeToRef, getContinuousDataFromRef } from "../../firebase";
import { useState } from "react";
import { useEffect } from "react";
import MySwitch from "../MySwitch"
import SingleItemEditor from "../SingleItemEditor"

export default () => {
  const [generalInfo, setGeneralInfo] = useState(false);

  const setGeneralInfoRef = useState(null)[1];

  useEffect(() => {
    setGeneralInfoRef(
      getContinuousDataFromRef("Schools/general", val => setGeneralInfo(val))
    );
    return setGeneralInfoRef(null);
    }, []);

  return (
    <div className="covid-settings">
      <Card>
        <CardBody>
          <div className="item-row">
            Show Check-In Questionnaire On CSBC App:
            <MySwitch
              checked={generalInfo.showCovidCheckIn}
              onChange={() =>
                writeToRef(
                  "Schools/general/showCovidCheckIn",
                  !generalInfo.showCovidCheckIn
                )
              }
            />
          </div>
          <SingleItemEditor
            onSubmit={e =>
              writeToRef("Schools/general/familyCovidCheckInCode", e)
            }
            className="mt-2 code-editor"
            type="text"
            placeholder="MobileCause Form Code (6 numbers/letters after '/form/' in check-in URL)"
            editable
            value={generalInfo.familyCovidCheckInCode}
          />
        </CardBody>
      </Card>
    </div>
  );
};
