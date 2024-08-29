import * as React from "react";
import { render } from "@testing-library/react";
import App from "../components/App";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { thunk } from "redux-thunk";

describe("App", () => {
  const mockStore = configureMockStore([thunk]);
  const initialState = {
    users: {
      user1: {
        id: "user1",
        password: "123",
      },
      user2: {
        id: "user2",
        password: "123",
      },
    },
  };
  const store = mockStore(initialState);
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
