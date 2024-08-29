import React from "react";
import "./index.css";
import App from "./components/App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import reducers from "./reducers";
import middleware from "./middleware";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({ reducer: reducers, middleware: middleware });

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
