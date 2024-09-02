import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import uiReducer, { initialState } from "./reducers/uiReducer";
import { Map } from "immutable";

// Create the Redux store with thunk middleware and Redux DevTools support
const store = createStore(
  uiReducer,
  Map(initialState), // Ensure initialState is compatible with Map
  composeWithDevTools(
    applyMiddleware(thunk) // Apply middleware and DevTools
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
