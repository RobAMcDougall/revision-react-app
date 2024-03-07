// @vitest-environment node
const db = require("../db/db");
const videoNote = require("./videoNote");

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.resetAllMocks();
});

describe("createVideoNote", () => {
    it("should create a video note on success", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{video: 1, text: "test", id: 1}]
        });

        const result = await videoNote.createVideoNote(1, "test");
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("id");

        expect(result.video).toBe(1);
        expect(result.text).toBe("test");
        expect(result.timestamp).not.toBeDefined();
    });


    it("should create a video note on success (with timestamp)", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{video: 1, text: "test", timestamp: 120, id: 1}]
        });

        const result = await videoNote.createVideoNote(1, "test", 120);
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("id");

        expect(result.video).toBe(1);
        expect(result.text).toBe("test");
        expect(result.timestamp).toBe(120);
    });

    it("should throw an error on db query error", async () => {
        vi.spyOn(db, "query").mockRejectedValue(new Error("Something went wrong"));

        try {
            await videoNote.createVideoNote(1, "invalid");
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Something went wrong");
        }
    });
});

describe("getVideoCard", () => {
    it("should resolve with a single video card on success", async () => {
        const testNote = {id: 1, video: 1, text: "test"};
        vi.spyOn(db, "query").mockResolvedValueOnce({rows: [testNote]});

        const result = await videoNote.getVideoNotes(1);
        expect(result).toHaveLength(1);
        expect(result[0].video).toBe(1);
        expect(result[0].text).toBe("test");
    });
});

describe("deleteVideoNote", () => {
    it("should delete and return a video note on success", async () => {
        const testNote = {id: 1, video: 1, text: "test"};
        vi.spyOn(db,  "query").mockResolvedValueOnce({rows: [testNote]});
        
        const result = await videoNote.deleteVideoNote(1);
        expect(result.video).toBe(1);
        expect(result.text).toBe("test");
    });

    it("should throw an error on non-existent video notes", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await videoNote.deleteVideoNote(1);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Video note could not be found.");
        }
    });
});

describe("updateNoteText", () => {
    it("should update the text for and return a video note on success", async () => {
        const testNote = {id: 1, video: 1, text: "test"};
        vi.spyOn(db,  "query").mockResolvedValueOnce({
            rows: [{...testNote, text: "test2"}]
        });

        const result = await videoNote.updateNoteText(1, "test2");
        expect(result.text).toBe("test2");
    });
    
    it("should throw an error on non-existent video notes", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await videoNote.updateNoteText(1, 120);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Video note could not be found.");
        }
    });
});
