import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./components/reducer/Reducer";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const store = createStore(Reducer);

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App store={store} />
    </Provider>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
