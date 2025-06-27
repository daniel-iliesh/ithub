// React
import ReactDOM from "react-dom/client";
// Redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import { applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// Reducers
import reducers from "./reducers";
// Bootstrap stylesheet
import "bootstrap/dist/css/bootstrap.min.css";
// Styles
import "./index.css";
// Components
import App from "./App";

const store = configureStore({
  reducer: { reducers },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
