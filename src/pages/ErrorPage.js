import React from "react";
import { Container, Button } from "shards-react";

const ErrorPage = ({ code, title, message }) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
      <div className="error__content">
        <h2>{code ? code : '500'}</h2>
        <h3>{title ? title : 'Something went wrong!'}</h3>
        <p>{message ? message : 'There was a problem on our end. Please try again later.'}</p>
        <Button pill href='/'>&larr; Home</Button>
      </div>
    </div>
  </Container>
);

export default ErrorPage
