/* eslint-disable testing-library/no-node-access */
import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginModal from "./LoginModal";
import { login, register } from "../services/auth";
import AuthProvider from "../contexts/AuthContext";

const handleLoginClose = jest.fn();

jest.mock("../services/auth");
const localStorageGetItem = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  "getItem"
);
const localStorageSetItem = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  "setItem"
);

describe("component LoginModal", () => {
  const TEST_EMAIL = "test@example.com";
  const TEST_TEAM_NAME = "Test team";
  const TEST_UNIT = { email: TEST_EMAIL, name: TEST_TEAM_NAME };

  beforeEach(() => {
    localStorageGetItem.mockReturnValue(null);
    localStorageSetItem.mockReturnValue(null);
  });

  afterAll(() => {
    localStorageGetItem.mockRestore();
    localStorageSetItem.mockRestore();
  });

  function renderWithUser() {
    return {
      user: userEvent.setup(),
      ...render(
        <AuthProvider>
          <LoginModal handleLoginClose={handleLoginClose} />
        </AuthProvider>
      ),
    };
  }

  it("switch between views", async () => {
    const { user } = renderWithUser();

    const modal = document.querySelector(".modal-dialog");
    expect(screen.getByText("Ready to explore?")).toBeDefined();
    expect(modal).toMatchSnapshot();

    await user.click(screen.getByText("register first"));

    expect(screen.getByText("Register Team")).toBeDefined();
    expect(modal).toMatchSnapshot();

    await user.click(screen.getByText("log in"));

    expect(screen.getByText("Ready to explore?")).toBeDefined();
  });

  it("login success", async () => {
    const { user } = renderWithUser();
    login.mockResolvedValue(TEST_UNIT);

    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    act(() => {
      user.click(screen.getByText("Start Exploring"));
    });

    await waitFor(() => expect(handleLoginClose).toHaveBeenCalledTimes(1));

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(TEST_EMAIL);

    expect(localStorageSetItem).toHaveBeenCalledTimes(1);
    expect(localStorageSetItem).toHaveBeenCalledWith(
      "ggsUnit",
      JSON.stringify(TEST_UNIT)
    );
  });

  it("login failure - unknown email", async () => {
    const { user } = renderWithUser();
    login.mockRejectedValue({ status: 404 });

    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    act(() => {
      user.click(screen.getByText("Start Exploring"));
    });

    expect(
      await screen.findByText(
        "Email address not found. If this is your first visit, please register first."
      )
    ).toBeDefined();

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(TEST_EMAIL);

    expect(localStorageSetItem).not.toHaveBeenCalled();
    expect(handleLoginClose).not.toHaveBeenCalled();
  });

  it("login failure - other error", async () => {
    const { user } = renderWithUser();
    login.mockRejectedValue({ status: 500 });

    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    act(() => {
      user.click(screen.getByText("Start Exploring"));
    });

    expect(
      await screen.findByText("Problem logging in. Please try again.")
    ).toBeDefined();

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(TEST_EMAIL);

    expect(localStorageSetItem).not.toHaveBeenCalled();
    expect(handleLoginClose).not.toHaveBeenCalled();
  });

  it("register success with team name", async () => {
    const { user } = renderWithUser();
    register.mockResolvedValue(TEST_UNIT);

    await user.click(screen.getByText("register first"));
    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    await user.type(
      screen.getByPlaceholderText("Enter team name (optional)"),
      TEST_TEAM_NAME
    );
    act(() => {
      user.click(screen.getByRole("button", { name: "Register" }));
    });

    await waitFor(() => expect(handleLoginClose).toHaveBeenCalledTimes(1));

    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(TEST_EMAIL, TEST_TEAM_NAME);

    expect(localStorageSetItem).toHaveBeenCalledTimes(1);
    expect(localStorageSetItem).toHaveBeenCalledWith(
      "ggsUnit",
      JSON.stringify(TEST_UNIT)
    );
  });

  it("register success without team name", async () => {
    const { user } = renderWithUser();
    register.mockResolvedValue({ email: TEST_EMAIL });

    await user.click(screen.getByText("register first"));
    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    act(() => {
      user.click(screen.getByRole("button", { name: "Register" }));
    });

    await waitFor(() => expect(handleLoginClose).toHaveBeenCalledTimes(1));

    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(TEST_EMAIL, "");

    expect(localStorageSetItem).toHaveBeenCalledTimes(1);
    expect(localStorageSetItem).toHaveBeenCalledWith(
      "ggsUnit",
      JSON.stringify({ email: TEST_EMAIL })
    );
  });

  it("register failure - existing email", async () => {
    const { user } = renderWithUser();
    register.mockRejectedValue({ status: 409 });

    await user.click(screen.getByText("register first"));
    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    act(() => {
      user.click(screen.getByRole("button", { name: "Register" }));
    });

    expect(
      await screen.findByText(
        "Email address already registered. Please log in instead."
      )
    ).toBeDefined();

    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(TEST_EMAIL, "");

    expect(localStorageSetItem).not.toHaveBeenCalled();
    expect(handleLoginClose).not.toHaveBeenCalled();
  });

  it("register failure - other error", async () => {
    const { user } = renderWithUser();
    register.mockRejectedValue({ status: 500 });

    await user.click(screen.getByText("register first"));
    await user.type(
      screen.getByPlaceholderText("Enter email address"),
      TEST_EMAIL
    );
    act(() => {
      user.click(screen.getByRole("button", { name: "Register" }));
    });

    expect(
      await screen.findByText("Problem registering. Please try again.")
    ).toBeDefined();

    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(TEST_EMAIL, "");

    expect(localStorageSetItem).not.toHaveBeenCalled();
    expect(handleLoginClose).not.toHaveBeenCalled();
  });
});
