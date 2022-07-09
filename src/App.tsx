import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { datadogLogs } from "@datadog/browser-logs";
import { datadogRum } from "@datadog/browser-rum";

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.initializeAppConfiguration();
  }

  initializeAppConfiguration() {
    const fetchConfigPromise = this.fetchConfig();
    Promise.resolve(fetchConfigPromise).then((configJSON) => {
      console.log(configJSON);
      if (configJSON) {
        datadogRum.init({
          applicationId: configJSON.datadog.applicationId,
          clientToken: configJSON.datadog.clientToken,
          site: configJSON.datadog.site,
          service: configJSON.datadog.service,
          env: configJSON.appEnv,
          version: configJSON.appVersion,
          sampleRate: 100,
          premiumSampleRate: 0,
          trackInteractions: true,
          trackFrustrations: true,
          allowedTracingOrigins: [window.location.origin]
        });
        datadogLogs.init({
          clientToken: configJSON.datadog.clientToken,
          site: configJSON.datadog.site,
          service: configJSON.datadog.service,
          env: configJSON.appEnv,
          version: configJSON.appVersion,
          forwardErrorsToLogs: true,
          sampleRate: 100
        });
      }
    });
  }

  fetchConfig() {
    return fetch("config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json());
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
