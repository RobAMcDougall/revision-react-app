import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup, fireEvent } from '@testing-library/react';
import StickyNotes from '.';

global.fetch = vi.fn()

describe("StickyNotes component", () => {

    afterEach(() => {
        cleanup();
    })

    it("Renders the StickyNotes component", () => {
        render(<StickyNotes />);
        const header = screen.getByText("Sticky Notes Board");
        expect(header).toBeTruthy();
    });

    it("Adds a new note when 'Add' button is clicked", () => {
        render(<StickyNotes />);
        const input = screen.getByPlaceholderText("Add a new note");
        const addButton = screen.getByText("Add");

        fireEvent.change(input, { target: { value: "New note" } });
        fireEvent.click(addButton);

        const newNote = screen.getByText("New note");
        expect(newNote).toBeTruthy();
    });

    it("Does not add more than 4 notes", () => {
        render(<StickyNotes />);
        const input = screen.getByPlaceholderText("Add a new note");
        const addButton = screen.getByText("Add");

        for (let i = 0; i < 5; i++) {
            fireEvent.change(input, { target: { value: `Note ${i + 1}` } });
            fireEvent.click(addButton);
        }

        const notes = screen.getAllByTestId("sticky-note");
        expect(notes.length).toBe(4);
    });

    it("Removes a note when 'X' button is clicked", () => {
        render(<StickyNotes />);
        const input = screen.getByPlaceholderText("Add a new note");
        const addButton = screen.getByText("Add");

        fireEvent.change(input, { target: { value: "Note to remove" } });
        fireEvent.click(addButton);

        const removeButtons = screen.getAllByText("X");
        removeButtons.forEach(fireEvent.click);

        const notes = screen.queryAllByTestId("sticky-note");
        expect(notes.length).toBe(0);
    });
});
