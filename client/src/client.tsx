import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createHttpClient } from "mst-gql";
import { RootStore, StoreContext } from "./models";
import App from "./App";
import "./index.css";

const gqlHttpClient = createHttpClient("http://localhost:4000");

const gqlWsClient = new SubscriptionClient("ws://localhost:4000", {
  reconnect: true
});

const rootStore = RootStore.create(undefined, {
  gqlHttpClient,
  gqlWsClient
});
ReactDOM.render(
  <StoreContext.Provider value={rootStore}>
    <App />
  </StoreContext.Provider>,
  document.getElementById("root")
);

// @ts-ignore
window.store = rootStore;

if (module.hot) {
  module.hot.accept();
}
