import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import VideoNoteLanding from ".";

describe("VideoNoteLanding", () => {
  beforeEach(() => {
    render(<VideoNoteLanding />);
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the necessary elements", async () => {
    const heading = screen.getByRole("heading");
    const paragraph = screen.getByText(
      "YouTube, now a primary study tool, offers diverse educational content. Its integration into an app boosts accessibility and efficiency. By consolidating resources, it saves time and aligns with modern learners' need for streamlined knowledge access, marking a significant leap in efficient learning methods."
    );
    const image = screen.getByRole("img");
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
