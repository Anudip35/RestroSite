import React from "react";
import ReactDOM from "react-dom/client";
import Page from "./Page";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Page />
  </Provider>
);
