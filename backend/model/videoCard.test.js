// @vitest-environment node
const db = require("../db/db");
const videoCard = require("./videoCard");

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.resetAllMocks();
});

describe("createVideoCard", () => {
    it("should create a video card on success", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{account: 1, video_id: "LYdGfjtdtI4", id: 1}]
        });

        const result = await videoCard.createVideoCard(1, "LYdGfjtdtI4");
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("id");

        expect(result.account).toBe(1);
        expect(result.video_id).toBe("LYdGfjtdtI4");
    });

    it("should throw an error on db query error", async () => {
        vi.spyOn(db, "query").mockRejectedValue(new Error("Something went wrong"));

        try {
            await videoCard.createVideoCard(1, "invalid");
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Something went wrong");
        }
    });
});

describe("getVideoCard", () => {
    it("should resolve with a single video card on success", async () => {
        const testCard = {id: 1, account: 1, video_id: "LYdGfjtdtI4"};
        vi.spyOn(db, "query").mockResolvedValueOnce({rows: [testCard]});

        const result = await videoCard.getVideoCard(1);
        expect(result.account).toBe(1);
        expect(result.video_id).toBe("LYdGfjtdtI4");
    });

    it("should throw an error on non-existent video cards", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await videoCard.getVideoCard(1);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Video card could not be found.");
        }
    });
});

describe("deleteVideoCard", () => {
    it("should delete and return a video card on success", async () => {
        const testCard = {id: 1, account: 1, video_id: "LYdGfjtdtI4"};
        vi.spyOn(db,  "query").mockResolvedValueOnce({rows: [testCard]});
        
        const result = await videoCard.deleteVideoCard(1);
        expect(result.account).toBe(1);
        expect(result.video_id).toBe("LYdGfjtdtI4");
    });

    it("should throw an error on non-existent video cards", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await videoCard.deleteVideoCard(1);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Video card could not be found.");
        }
    });
});

describe("addResumeTimestamp", () => {
    it("should update the timestamp for and return a video card on success", async () => {
        const testCard = {id: 1, account: 1, video_id: "LYdGfjtdtI4"};
        vi.spyOn(db,  "query").mockResolvedValueOnce({
            rows: [{...testCard, resume_timestamp: 120}]
        });

        const result = await videoCard.updateResumeTimestamp(1, 120);
        expect(result.resume_timestamp).toBe(120);
    });
    
    it("should throw an error on non-existent video cards", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await videoCard.updateResumeTimestamp(1, 120);
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Video card could not be found.");
        }
    });
});
