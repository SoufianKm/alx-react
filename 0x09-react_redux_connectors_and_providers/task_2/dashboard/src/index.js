import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import uiReducer, { initialState } from "./reducers/uiReducer";
import { Map } from "immutable";

const store = createStore(uiReducer, Map(initialState), applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
