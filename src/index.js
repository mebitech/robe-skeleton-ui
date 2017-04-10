const Application = require("robe-react-commons/lib/application/Application");
const Locale = require("robe-react-ui/lib/assets/en_US.json"); // eslint-disable-line import/no-unresolved
// Load your i18n json.
Application.default.loadI18n(Locale);
import React from "react";
import {render} from "react-dom";
import App from "./app/App";

let dom = document.getElementById("app");

render(
    <App />,
    dom
)