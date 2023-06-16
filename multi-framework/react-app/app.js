import React from "react";
import ReactDOM from "react-dom";
import { TOKEN } from "auth-library";

class App extends React.Component {
  render() {
    const reactVersion = require("./package.json").dependencies["react"];

    console.log(JSON.stringify(TOKEN));

    return [
      <h1>
        React
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          height="30"
        ></img>
      </h1>,
      <p>React Version: {reactVersion}</p>,
      <div>Running on localhost</div>,
      <div>Token from Auth Lib: {TOKEN}</div>,
    ];
  }
}

class Mfe4Element extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
}

customElements.define("react-element", Mfe4Element);
