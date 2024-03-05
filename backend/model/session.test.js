const db = require("../db/db");
const session = require("./session");

describe('model/session', () => {
    beforeEach(vi.clearAllMocks);
    afterAll(vi.resetAllMocks);

    describe("createSession", () => {
        it("should create a user session on success", async () => {
            const testSession = {token: "00000000-0000-0000-0000-000000000000"};
            vi.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testSession]
            });

            const result = await session.createSession(0);
            expect(result.token).toBe("00000000-0000-0000-0000-000000000000");
        });
    });
    
    describe("getSession", () => {
        it("should resolve with a required session on success", async () => {
            const testSession = {account: 0, token: "00000000-0000-0000-0000-000000000000"};
            vi.spyOn(db,  "query").mockResolvedValueOnce({rows: [testSession]});

            const result = await session.getSession("00000000-0000-0000-0000-000000000000");
            expect(result.account).toBe(0);
        });

        it("should throw an error on db query error", async () => {
            vi.spyOn(db,  "query").mockResolvedValueOnce(null);

            try {
                await session.getSession("00000000-0000-0000-0000-000000000000");
            } catch (err) {
                expect(err).toBeDefined();
                expect(err.message).toBe("Token could not be found.");
            }
        });
    });
    
    describe("destroySession", () => {
        it('should remove a user session on success', async () => {
            vi.spyOn(db,  "query").mockResolvedValueOnce(null);
            const result = await session.destroySession("00000000-0000-0000-0000-000000000000");
            expect(result).toBeDefined();
        });
    });
});
