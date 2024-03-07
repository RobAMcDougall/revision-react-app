import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Timer from '.';

global.fetch = vi.fn();

describe("Timer component", () => {

  afterEach(() => {
    cleanup();
  });

  it("Renders the Timer component", () => {
    render(<Timer />);
    const timerDisplay = screen.getByText("25:00"); // Assuming the default work duration is 25 minutes
    expect(timerDisplay).toBeTruthy();
  });

  it("Starts and pauses the timer", async () => {
    render(<Timer />);
    const startPauseButton = screen.getByText("Start");

    fireEvent.click(startPauseButton);
    let timerDisplay = screen.getByText("25:00");
    expect(timerDisplay).toBeTruthy();

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

    fireEvent.click(startPauseButton);
    timerDisplay = screen.getByText("24:59");
    expect(timerDisplay).toBeTruthy();
  });

  it("Resets the timer", () => {
    render(<Timer />);
    const resetButton = screen.getByText("Pomodoro");

    fireEvent.click(resetButton);
    const timerDisplay = screen.getByText("25:00"); // Assuming the default work duration is 25 minutes
    expect(timerDisplay).toBeTruthy();
  });

});
