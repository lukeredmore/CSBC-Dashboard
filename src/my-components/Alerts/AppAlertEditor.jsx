import React, { useState } from "react";
import "./AppAlertEditor.scss";
import { Card, CardHeader, CardBody, FormInput, Button } from "shards-react";
import { useEffect } from "react";
import { getContinuousDataFromRef, getDataFromRef, writeToRef } from "../../firebase";
import MySwitch from "../MySwitch"
import LoadingSymbol from '../Login/LoadingSymbol'

export default () => {
  const setBannerAlertListener = useState(null)[1];
  const [bannerAlert, setBannerAlert] = useState(null);

  useEffect(() => {
    setBannerAlertListener(
      getContinuousDataFromRef("BannerAlert", alert =>
        setBannerAlert(alert)
      )
    );

    return () => setBannerAlertListener(null);
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setBannerAlert({ ...bannerAlert, [name]: value });

  return (
    <div className="app-alert-editor">
      <Card>
        <CardHeader className="border-bottom">
          <h5>Banner Alert</h5>
        </CardHeader>
        <CardBody>
          {bannerAlert !== null ? (
            <>
              <div className="mb-3">
                Please use this form to update the message displayed in the red
                banner on the homescreen of the CSBC app. To remove the current
                message (if any), just click 'Update' with the 'Message' box
                left blank.
              </div>
              <form
                className="form-inline"
                onSubmit={async e => {
                  e.preventDefault();
                  const success = await writeToRef(
                    "BannerAlert",
                    bannerAlert
                  );
                  alert(
                    success
                      ? "Banner alert successfully updated!"
                      : "Alert could not be updated!"
                  );
                }}
              >
                <label>Message:</label>
                <FormInput
                  value={bannerAlert.message}
                  name="message"
                  onChange={handleChange}
                />
                <div className="switch-row">
                  <label>
                    Auto Update (Match the message displayed on the app with
                    the one on the website):
                  </label>
                  <MySwitch
                    checked={!bannerAlert.override}
                    onChange={() =>
                      setBannerAlert({
                        ...bannerAlert,
                        override: !bannerAlert.override
                      })
                    }
                  />
                </div>
                <div className="switch-row">
                  <label>
                    Auto Notify (Automatically send a one-time notification to
                    all app users with the text of this message at 7:00 AM):
                  </label>
                  <MySwitch
                    checked={bannerAlert.autoNotify}
                    onChange={() =>
                      setBannerAlert({
                        ...bannerAlert,
                        autoNotify: !bannerAlert.autoNotify
                      })
                    }
                  />
                </div>
                <div className="switch-row">
                  <label>
                    Weather Related (Check this to enable a snowfall animation
                    when viewing the message on the app):
                  </label>
                  <MySwitch
                    checked={bannerAlert.shouldSnow}
                    onChange={() =>
                      setBannerAlert({
                        ...bannerAlert,
                        shouldSnow: !bannerAlert.shouldSnow
                      })
                    }
                  />
                </div>

                <div className="form-footer">
                  <div className="btn-form">
                    <Button type="submit" theme="success">
                      <i className="fa fa-upload" /> Update
                    </Button>
                  </div>
                  <div className="btn-form">
                    <Button
                      onClick={async () => {
                        let alert = await getDataFromRef("BannerAlert");
                        setBannerAlert(alert);
                      }}
                      theme="dark"
                    >
                      <i className="fa fa-undo" /> Revert
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : (
            <LoadingSymbol />
          )}
        </CardBody>
      </Card>
    </div>
  );
};
