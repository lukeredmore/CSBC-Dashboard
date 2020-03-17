import React from "react"
import { Alert } from "shards-react"

const BannerAlert = props => {
  if (props && props.alert) {
      const { alert } = props
    window.setTimeout(() => {
      props.onAutoDismiss()
    }, 2500)
    return (
      <Alert
        theme={alert.theme ? alert.theme : "primary"}
        open={true}
        className="mb-0"
      >
        <i className="fa fa-info mx-2"></i>
        {alert ? alert.message : ""}
      </Alert>
    )
  } else {
    return null
  }
}

export default BannerAlert
