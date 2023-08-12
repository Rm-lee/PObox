import React from "react";
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import "./index.css";
import { reducer } from "./Reducers";
const createLogActionStackTraceMiddleware = (actionTypes = []) => {
  const logActionStackTraceMiddleware = storeAPI => next => action => {
    if (action.type && actionTypes.includes(action.type)) {
      console.trace(`Action: ${action.type}`);
    }

    return next(action);
  };

  return logActionStackTraceMiddleware;
};
const stackTraceMiddleware = createLogActionStackTraceMiddleware([
  "GETALLBOOKMARKSNOPID",
  "CURRENTPROJ"
]);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, stackTraceMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);
const container = document.getElementById('root');
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>

);
