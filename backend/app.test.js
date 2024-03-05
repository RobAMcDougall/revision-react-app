import request from "supertest";
const app = require("./app");

describe("routes/account", () => {
    describe("register", () => {
        it("should return status 201 upon successful request", () => new Promise(done => {
            const testAccount = {
                username: "test",
                email: "test@example.com",
                password: "test"
            };

            request(app.callback())
                .post("/account/register")
                .send(testAccount)
                .set("Content-Type", "application/json")
                .expect(201, done);
        }));

        it("should return status 400 for an invalid request", () => new Promise(done => {
            request(app.callback())
                .post("account/register")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .expect(400, done);
        }));
    });
    
    describe("login", () => {
        it("should return status 200 upon successful request", () => new Promise(done => {
            request(app.callback())
                .post("account/login")
                .send({username: "test", password: "test"})
                .set("Content-Type", "application/json")
                .expect(200, done);
        }));


        it("should return status 400 for an invalid request", () => new Promise(done => {
            request(app.callback())
                .post("account/login")
                .send({username: "test", password: "test"})
                .set("Content-Type", "application/json")
                .expect(400, done);
        }));
    });

    describe("logout", () => {
        it("should return status 204 upon successful request", () => new Promise(done => {
            request(app.callback())
                .post("account/logout")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .set("Authorization", "00000000-0000-0000-0000-000000000000")
                .expect(204, done);
        }));


        it("should return status 400 for an invalid request", () => new Promise(done => {
            request(app.callback())
                .post("account/login")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .expect(400, done);

            request(app.callback())
                .post("account/login")
                .send({})
                .set("Content-Type", "application/json")
                .set("Authorization", "00000000-0000-0000-0000-000000000000")
                .expect(400, done);
        }));
    });
});
