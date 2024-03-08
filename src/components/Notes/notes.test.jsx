// Note.test.js

import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Notes from "./index";

let textarea, saveButton;
beforeEach(() => {
  render(<Notes />);
  textarea = screen.getByPlaceholderText("Enter your notes here...");
  saveButton = screen.getByText("Save");
});

afterEach(() => {
  cleanup();
});

it("renders textarea and save button", async () => {
  expect(textarea).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
});

it("updates note state when typing in textarea", async () => {
  fireEvent.input(textarea, { target: { value: "New note" } });
  expect(textarea.value).toBe("New note");
});
