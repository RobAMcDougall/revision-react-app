import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
import Navigation from ".";

describe("Navigation", () => {
  beforeEach(() => {
    render(<Navigation />);
  });
  afterEach(() => {
    cleanup();
  });

  it("displays a navbar with three children", async () => {
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
    expect(nav.childNodes.length).toBe(3);
  });

  it("Changes location on the page when clicked", async () => {
    await userEvent.click(scrollToSection);
    expect(window.sectionID).toContain("section");
  });
});
