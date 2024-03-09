// @vitest-environment node
import {createMockContext} from "@story-health/vitest-koa-mocks";
import {afterAll} from "vitest";

const bcrypt = require("bcryptjs");
const accounts = require("./account");
const Account = require("../model/account");
const Session = require("../model/session");

describe("register", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks();
        ctx = createMockContext({
            requestBody: {
                username: "test",
                email: "test@example.com",
                password: "test"
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
    });

    afterAll(() => {
        vi.resetAllMocks();
    });

    it("should create an account upon successful request", async () => {
        vi.spyOn(Account, "createAccount").mockResolvedValue({});
        await accounts.register(ctx);
        expect(Account.createAccount).toHaveBeenCalledTimes(1);
        expect(ctx.status).toBe(201);
        expect(ctx.body).toStrictEqual({});
    });

    it("should hash passwords upon account creation", async () => {
        await accounts.register(ctx);
        expect(Account.createAccount).toHaveBeenCalledTimes(1);
        expect(ctx.request.body.password).not.toBe("test");
        expect(await bcrypt.compare("test", ctx.request.body.password)).toBe(true);
    });

    it("should throw an error upon invalid request", async () => {
        vi.spyOn(Account, "createAccount").mockRejectedValue(new Error("Something went wrong"));
        await accounts.register(ctx);
        expect(Account.createAccount).toHaveBeenCalledTimes(1);
        expect(ctx.status).toBe(400);
        expect(ctx.body).toStrictEqual({error: "Something went wrong"});
    });
});

describe("login", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks();
        ctx = createMockContext({
            requestBody: {
                username: "test",
                password: "test"
            },
            headers: {
                "Content-Type": "application/json"
            }
        });
    });

    afterAll(() => {
        vi.resetAllMocks();
    });

    it("should return an auth session upon successful login", async () => {
        vi.spyOn(Account, "getAccount").mockResolvedValue({
            password: await bcrypt.hash("test", await bcrypt.genSalt())
        });
        vi.spyOn(Session, "createSession").mockResolvedValue({token: "00000000-0000-0000-0000-000000000000"});

        await accounts.login(ctx);
        expect(Account.getAccount).toHaveBeenCalledTimes(1);
        expect(Session.createSession).toHaveBeenCalledTimes(1);
        expect(ctx.status).toBe(200);
        expect(ctx.body).toStrictEqual({token: "00000000-0000-0000-0000-000000000000"});
    });

    it("should throw an error if password does not match", async () => {
        vi.spyOn(Account, "getAccount").mockResolvedValue({password: ""});
        await accounts.login(ctx);
        expect(Account.getAccount).toHaveBeenCalledTimes(1);
        expect(Session.createSession).toHaveBeenCalledTimes(0);
        expect(ctx.status).toBe(400);
        expect(ctx.body).toStrictEqual({error: "Invalid credentials."});
    });
});

describe("logout", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks();
        ctx = createMockContext({headers: {"Authorization": "00000000-0000-0000-0000-000000000000"}});
    });

    afterAll(() => {
        vi.resetAllMocks();
    });

    it("should delete an auth session on logout", async () => {
        vi.spyOn(Session, "destroySession").mockResolvedValue(null);
        await accounts.logout(ctx);
        expect(ctx.status).toBe(204);
    });
    
    it("should throw an error on invalid logout requests", async () => {
        vi.spyOn(Session, "destroySession").mockRejectedValue(new Error("Something went wrong."));
        await accounts.logout(ctx);
        expect(ctx.status).toBe(400);
    });
});

describe("protect", () => {
    let ctx;

    beforeEach(() => {
        vi.clearAllMocks();
        ctx = createMockContext({headers: {"Authorization": "00000000-0000-0000-0000-000000000000"}});
    });

    afterAll(() => {
        vi.resetAllMocks();
    });

    it("should allow access if logged in with a valid session token", async () => {
        vi.spyOn(Session, "getSession").mockResolvedValue(null);
        await accounts.protect(ctx, async () => ctx.body = "Approved");
        expect(Session.getSession).toHaveBeenCalledTimes(1);
        expect(ctx.status).toBe(200);
        expect(ctx.body).toBe("Approved");
    });

    it("should deny access for any invalid session token", async () => {
        vi.spyOn(Session, "getSession").mockRejectedValue(new Error("Denied"));
        await accounts.protect(ctx, async () => ctx.body = "Approved");
        expect(ctx.status).toBe(403);
        expect(ctx.body).toStrictEqual({error: "Denied"});
    });
});
