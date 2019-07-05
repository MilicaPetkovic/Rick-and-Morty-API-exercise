import React, { Component } from "react";
import Characters from "./Characters";
import { Route } from "react-router-dom";
import Info from "./Info";
import ErrorBoundary from "./ErrorBoundary";

// ROUTING GOES HERE
class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Route path="/" exact component={Characters} />
          <Route path="/:id" component={Info} />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
