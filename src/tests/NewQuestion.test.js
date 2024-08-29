import * as React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import * as router from "react-router";
import middleware from "../middleware";
import NewQuestion from "../components/NewQuestion";
import { thunk } from "redux-thunk";

describe("NewQuestion", () => {
  const mockStore = configureMockStore([thunk]);
  const initialState = {
    questions: {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "user1",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["sarahedo"],
          text: "Build our new application with Javascript",
        },
        optionTwo: {
          votes: [],
          text: "Build our new application with Typescript",
        },
      },
    },
    authedUser: "user1",
    users: {
      user1: {
        id: "user1",
        password: "123",
        name: "User1",
        avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
        },
        questions: ["8xf0y6ziyjabvozdd253nd"],
      },
    },
  };
  const store = mockStore(initialState);

  it("matches the snapshot", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("adds successfully", async () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <NewQuestion />
        </BrowserRouter>
      </Provider>
    );
    const optionOne = component.getByTestId("text-option-one");
    const optionTwo = component.getByTestId("text-option-two");
    fireEvent.change(optionOne, { target: { value: "Eat before 8pm" } });
    fireEvent.change(optionTwo, { target: { value: "Eat after 8pm" } });
    const submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });
});
