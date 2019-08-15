import "react-app-polyfill/ie9";
import "core-js";
import * as React from "react";
import { render } from "react-dom";
import IntegrationReactSelect from "./Select.tsx";

import "./styles.css";
const mockCities = [
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  },
  {
    label: "dadasdas",
    value: "dsdasdasdas",
    labelInMenu: "sddasdasdasd"
  }
];

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <IntegrationReactSelect
        name="ort"
        label="Ort"
        placeholder="Wählen Sie einen Ort…"
        noOptionsMessage="Wählen Sie zuerst ein Bundesland aus"
        isLoading={false}
        options={(false ? [] : [].concat(mockCities)).map(val => {
          return {
            label: val.label,
            value: val.value,
            labelInMenu: val.label
          };
        })}
        isMulti={false}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
