import React from "react";
import { Button } from "shards-react";
import Footer from '../layout/components/MainFooter'

const ErrorPage = ({ code, title, message, history }) => (
  <div>
    <div
      style={{
        position: "absolute",
        top: "47%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            color: "#cacedb",
            fontWeight: "700",
            fontSize: "3.75rem",
            marginBottom: "1.5625rem"
          }}
        >
          {code ? code : "500"}
        </h2>
        <h3
          style={{
            fontWeight: "500",
            fontSize: "2.1875rem",
            marginBottom: "0.625rem"
          }}
        >
          {title ? title : "Something went wrong!"}
        </h3>
        <p>
          {message
            ? message
            : "There was a problem on our end. Please try again later."}
        </p>
        <Button pill onClick={history.goBack}>
          &larr; Go Back
        </Button>
      </div>
    </div>
    <div style={{position: 'absolute', bottom: '0', width: '100%'}}>
      <Footer />
    </div>
  </div>
);

export default ErrorPage;
