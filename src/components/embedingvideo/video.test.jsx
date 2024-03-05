import { describe, it, expect } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import VideoPlayer from "./index";

describe("VideoPlayer", () => {
  it("renders input field and button", () => {
    render(<VideoPlayer />);

    const input = screen.getByRole("textbox", { name: /youtube url/i });
    const button = screen.getByRole("button", { name: /play video/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("updates the video url when the input changes", () => {
    render(<VideoPlayer />);

    const input = screen.getByRole("textbox", { name: /youtube url/i });

    userEvent.type(input, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");

    expect(input).toHaveValue("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  });

  it("displays an error message when an invalid youtube url is entered", async () => {
    render(<VideoPlayer />);

    const input = screen.getByRole("textbox", { name: /youtube url/i });
    const button = screen.getByRole("button", { name: /play video/i });

    userEvent.type(input, "https://www.youtube.com/notavalidurl");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText("Invalid YouTube URL")).toBeInTheDocument()
    );
  });

  it("renders the youtube player when a valid youtube url is entered", async () => {
    render(<VideoPlayer />);

    const input = screen.getByRole("textbox", { name: /youtube url/i });
    const button = screen.getByRole("button", { name: /play video/i });

    userEvent.type(input, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    userEvent.click(button);

    await waitFor(() =>
      expect(screen.getByTestId("youtube-player")).toBeInTheDocument()
    );
  });
});
