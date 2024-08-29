import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import configureMockStore from "redux-mock-store";

describe("LoginPage", () => {
  beforeAll(() => {
    // Mock the alert function
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });
  afterAll(() => {
    // Restore the original alert function
    window.alert.mockRestore();
  });
  const mockStore = configureMockStore();
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
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("has an the login-box div element", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const div = component.getByTestId("login-box");
    expect(div).toBeInTheDocument();
  });

  it("trigger alert if failed login", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    const inputId = component.getByTestId("login-id");
    const inputPassword = component.getByTestId("login-password");
    fireEvent.change(inputId, { target: { value: "user1" } });
    fireEvent.change(inputPassword, { target: { value: "222" } });
    const submitButton = component.getByTestId("login-button");
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith("Login failed. Wrong password");
  });

  it("trigger alert if success login", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    var inputId = component.getByTestId("login-id");
    var inputPassword = component.getByTestId("login-password");
    fireEvent.change(inputId, { target: { value: "user1" } });
    fireEvent.change(inputPassword, { target: { value: "123" } });
    var submitButton = component.getByTestId("login-button");
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith("Login successfully!");
  });
});
