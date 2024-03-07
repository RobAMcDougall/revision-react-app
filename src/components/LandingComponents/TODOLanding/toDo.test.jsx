import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import TODOlanding from ".";

describe("TODOLanding", () => {
  beforeEach(() => {
    render(<TODOlanding />);
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the necessary elements", async () => {
    const heading = screen.getByRole("heading");
    const paragraph = screen.getByText(
      "To-do lists are societal organizers, simplifying tasks for individuals. By breaking down goals into manageable steps, they enhance productivity and efficiency. Easy accessibility encourages widespread adoption, empowering people to prioritize effectively and achieve their objectives with clarity and focus."
    );
    const image = screen.getByRole("img");
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
