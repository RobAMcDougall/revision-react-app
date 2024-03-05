import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import VideoPlayer from "./index";

describe("VideoPlayer", () => {
  beforeEach(() => {
    render(<VideoPlayer />);
  });
  afterEach(() => {
    cleanup();
  });
  it("renders input field and button", () => {
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("updates the video url when the input changes", () => {
    const input = screen.getByRole("textbox");
    userEvent.type(input, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(input).toHaveValue("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  });

  it("displays an error message when an invalid youtube url is entered", () => {
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    userEvent.type(input, "invalid url");
    userEvent.click(button);
    const errorMessage = screen.getByText("Invalid YouTube URL");
    expect(errorMessage).toBeInTheDocument();
  });

  it("renders the youtube player when a valid youtube url is entered", () => {
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    userEvent.type(input, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    userEvent.click(button);
    const iframe = screen.getByTestId("youtube-player");
    expect(iframe).toBeInTheDocument();
  });
});
