import request from "supertest";
const app = require("./app");

describe("routes/account", () => {
    describe("register", () => {
        it("should return status 201 upon successful request", async () => {
            const testAccount = {
                username: "registerTest",
                email: "registerTest@example.com",
                password: "test"
            };

            await request(app.callback())
                .post("/account/register")
                .send(testAccount)
                .set("Content-Type", "application/json")
                .expect(201);
        });

        it("should return status 400 for an invalid request", async () => {
            await request(app.callback())
                .post("/account/register")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .expect(400);
        });
    });

    describe("login", () => {
        it("should return status 200 upon successful request", async () => {
            await request(app.callback())
                .post("/account/login")
                .send({username: "test", password: "test"})
                .set("Content-Type", "application/json")
                .expect(200);
        });


        it("should return status 400 for an invalid request", async () => {
            await request(app.callback())
                .post("/account/login")
                .send({username: "test", password: "test2"})
                .set("Content-Type", "application/json")
                .expect(400);
        });
    });

    describe("logout", () => {
        it("should return status 204 upon successful request", async () => {
            await request(app.callback())
                .delete("/account/logout")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .set("Authorization", "00000000-0000-0000-0000-000000000000")
                .expect(204);
        });
    });
});

/*
describe("routes/video", () => {
    describe("card", () => {
        describe("create", () => {
        });
        
        describe("retrieve", () => {
        });

        describe("update", () => {
        });

        describe("delete", () => {
        });
    });
    
    describe("note", () => {
        describe("create", () => {
        });

        describe("retrieve", () => {
        });

        describe("update", () => {
        });

        describe("delete", () => {
        });
    });
});
 */
