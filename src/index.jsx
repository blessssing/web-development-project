import React from "react";
import { render } from "react-dom";
import App from "@Components/App";
import "./babel";
import "./styles/styles.css";
import "./styles/scss.scss";
import "bootstrap/dist/css/bootstrap.min.css";

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
