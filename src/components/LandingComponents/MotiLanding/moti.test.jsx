import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import MotiLanding from ".";

describe("MotiLanding", () => {
  beforeEach(() => {
    render(<MotiLanding />);
  });
  afterEach(() => {
    cleanup();
  });

  it("renders the necessary elements", async () => {
    const heading = screen.getByRole("heading");
    const paragraph = screen.getByText(
      "Our app recognizes the value of motivation in shaping a better day. By incorporating daily inspirational quotes, it fosters positivity and resilience. These quotes serve as catalysts for personal growth and productivity, ensuring each day begins with encouragement and purpose, enhancing overall well-being and success."
    );
    const image = screen.getByRole("img");
    expect(heading).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
