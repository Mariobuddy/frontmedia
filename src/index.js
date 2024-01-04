import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./GlobalStyle";
import store from "./redux/store/store";
import { Provider } from "react-redux";
// import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode> */}
  </Provider>
);
