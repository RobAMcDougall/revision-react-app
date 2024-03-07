import { describe, it, expect, afterEach, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import * as matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Quotes from '.';

global.fetch = vi.fn()

function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) }
}

describe("Quotes component", () => {

    afterEach(() => {
        cleanup();
    })

    it("Displays 1 quote if the API returns only one quote", async () => {
        const data = {
            "content": "What do reindeer hang on their Christmas trees?",
            "author": "hornaments"
        };

        console.log(data.content)

        fetch.mockResolvedValue(createFetchResponse(data))

        render(<Quotes />);

        expect(fetch).toHaveBeenCalledWith("https://api.quotable.io/random")
        
        const quotes = await screen.findByRole("quote");
        expect(quotes.childNodes.length).toBe(1);
        expect(quotes.textContent).toBe("What do reindeer hang on their Christmas trees? - hornaments");
    });
});
