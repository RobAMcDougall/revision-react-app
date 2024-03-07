import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import CalenderLanding from ".";

describe("CalendarLanding", () => {
  beforeEach(() => {
    render(<CalenderLanding />);
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the necessary elements", async () => {
    const heading = screen.getByRole("heading");
    const paragraph = screen.getByText(
      "Calendars, essential for organization, integrate with Outlook, boosting accessibility and convenience. Digital platforms optimize time management by consolidating tasks. This aligns with modern society's pursuit of efficiency, enhancing productivity."
    );
    const image = screen.getByRole("img");
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
