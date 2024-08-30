import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

// Create the Redux store using the rootReducer
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
