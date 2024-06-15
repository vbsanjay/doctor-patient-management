import React, { Component } from "react";
import "./page500.css";

export class Page500 extends Component {
  render() {
    return (
      <div className="container-500">
        <div className="message">
          <h1>500</h1>
          <h3>Error</h3>
          <h2>It&apos;s not you, it&apos;s me.</h2>
          <button onClick={() => window.location.replace("/")}>Go Back</button>
        </div>
      </div>
    );
  }
}
