import * as React from "react";
import { render } from "@testing-library/react";
import App from "../components/App";
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

describe("App", () => {
  const store = configureStore({ reducer, middleware });
  it("matches the snapshot", () => {
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});
