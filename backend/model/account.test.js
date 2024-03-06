// @vitest-environment node
const db = require("../db/db");
const account = require("./account");

beforeEach(() => {
    vi.clearAllMocks();
});

afterAll(() => {
    vi.resetAllMocks();
});

describe("createAccount", () => {
    it("should create an account on success", async () => {
        const testAccount = {username: "test", email: "test@test.com", password: "test"};
        vi.spyOn(db, "query").mockResolvedValueOnce({
            rows: [{...testAccount, id: 1}]
        });

        const result = await account.createAccount(testAccount);
        expect(result).toBeTruthy();
        expect(result).toHaveProperty("id");

        expect(result.username).toBe("test");
        expect(result.email).toBe("test@test.com");
    });

    it("should throw an error on db query error", async () => {
        vi.spyOn(db,  "query").mockRejectedValue(new Error("Something went wrong"));
        
        try {
            await account.createAccount({});
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("Something went wrong");
        }
    });
});

describe("getAccount", () => {
    it("should resolve with a single account on success", async () => {
        const testAccount = {id: 1, username: "test", password: "test"};
        vi.spyOn(db, "query").mockResolvedValueOnce({rows: [testAccount]});

        const result = await account.getAccount("test");
        expect(result.username).toBe("test");
        expect(result.id).toBe(1);
    });

    it("should throw an error on non-existent accounts", async () => {
        vi.spyOn(db, "query").mockResolvedValueOnce(null);

        try {
            await account.getAccount("test");
        } catch (err) {
            expect(err).toBeDefined();
            expect(err.message).toBe("User could not be found.");
        }
    });
});
