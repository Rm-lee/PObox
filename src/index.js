import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { reducer } from "./Reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { HashRouter as Router } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
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

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
