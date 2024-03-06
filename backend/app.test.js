import request from "supertest";
const app = require("./app");

describe("routes/account", () => {
    describe("register", () => {
        it("should return status 201 upon successful registration", async () => {
            const testAccount = {
                username: "registerTest",
                email: "registerTest@test.com",
                password: "test"
            };

            await request(app.callback())
                .post("/account/register")
                .send(testAccount)
                .set("Content-Type", "application/json")
                .expect(201);
        });

        it("should return status 400 for an invalid registration request", async () => {
            await request(app.callback())
                .post("/account/register")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .expect(400);
        });
    });

    let token;

    describe("login", () => {
        it("should return status 200 upon successful login", async () => {
            await request(app.callback())
                .post("/account/login")
                .send({username: "test", password: "test"})
                .set("Content-Type", "application/json")
                .expect(200)
                .then(response => {
                    token = response.body.token;
                    expect(token).toBeDefined()
                    expect(response.body.account).toBe(0);
                });
        });


        it("should return status 400 for any incorrect login credentials", async () => {
            await request(app.callback())
                .post("/account/login")
                .send({username: "test", password: "test2"})
                .set("Content-Type", "application/json")
                .expect(400);
        });
    });

    describe("logout", () => {
        it("should return status 204 upon successful logout", async () => {
            await request(app.callback())
                .delete("/account/logout")
                .send({username: "test"})
                .set("Content-Type", "application/json")
                .set("Authorization", token)
                .expect(204);
        });
    });
});

describe("routes/video", () => {
    describe("card", () => {
        let id;
        
        describe("create", () => {
            it("should return status 201 upon successful video card creation", async () => {
                const testCard = {
                    account: 0,
                    video_id: "test"
                };

                await request(app.callback())
                    .post("/video/card")
                    .send(testCard)
                    .set("Content-Type", "application/json")
                    .expect(201)
                    .then(response => {
                        id = response.body.id;
                        expect(id).toBeDefined();
                        expect(response.body.account).toBe(0);
                        expect(response.body.video_id).toBe("test       ");
                    });
            });

            it("should return status 400 for invalid video card creation", async () => {
                await request(app.callback())
                    .post("/video/card")
                    .send({video_id: "test"})
                    .set("Content-Type", "application/json")
                    .expect(400);
            });
        });

        describe("retrieve", () => {
            it("should return status 200 upon successful video card retrieval", async () => {
                await request(app.callback())
                    .get("/video/card/0")
                    .expect(200);
            });

            it("should return status 404 for non-existent video cards", async () => {
                await request(app.callback())
                    .get("/video/card/a")
                    .expect(404);
            });
        });

        describe("update", () => {
            it("should return status 200 upon successful video card timestamp update", async () => {
                await request(app.callback())
                    .patch("/video/card/" + id)
                    .send("120")
                    .set("Content-Type", "text/plain")
                    .expect(200);
            });
            
            it("should return status 400 upon invalid video card timestamp update", async () => {
                await request(app.callback())
                    .patch("/video/card/0")
                    .send("a")
                    .set("Content-Type", "text/plain")
                    .expect(400);
            });

            it("should return status 404 for non-existent video cards", async () => {
                await request(app.callback())
                    .patch("/video/card/a")
                    .send("120")
                    .set("Content-Type", "text/plain")
                    .expect(404);
            });
        });

        describe("delete", () => {
            it("should return status 200 for successful video card deletion", async () => {
                await request(app.callback())
                    .delete("/video/card/" + id)
                    .expect(200);
            });

            it("should return status 404 for non-existent video cards", async () => {
                await request(app.callback())
                    .delete("/video/card/a")
                    .expect(404);
            });
        });
    });

    describe("note", () => {
        let id;

        describe("create", () => {
            it("should return status 201 upon successful video note creation", async () => {
                const testNote = {
                    video: 0,
                    text: "test",
                    timestamp: 60
                };

                await request(app.callback())
                    .post("/video/note")
                    .send(testNote)
                    .set("Content-Type", "application/json")
                    .expect(201)
                    .then(response => {
                        id = response.body.id;
                        expect(id).toBeDefined();
                    });
            });

            it("should return status 400 for invalid video note creation", async () => {
                await request(app.callback())
                    .post("/video/note")
                    .send({text: "test"})
                    .set("Content-Type", "application/json")
                    .expect(400);
            });
        });

        describe("retrieve", () => {
            it("should return status 200 for successful video note retrieval", async () => {
                await request(app.callback())
                    .get("/video/note/" + id)
                    .expect(200);
            });

            it("should return status 404 for non-existent video notes", async () => {
                await request(app.callback())
                    .get("/video/note/a")
                    .expect(404);
            });
        });

        describe("update", () => {
            it("should return status 200 upon successful video note update", async () => {
                await request(app.callback())
                    .patch("/video/note/" + id)
                    .send("test2")
                    .set("Content-Type", "text/plain")
                    .expect(200);
            });

            it("should return status 404 for non-existent video notes", async () => {
                await request(app.callback())
                    .patch("/video/note/a")
                    .send("test")
                    .set("Content-Type", "text/plain")
                    .expect(404);
            });
        });

        describe("delete", () => {
            it("should return status 200 for successful video note deletion", async () => {
                await request(app.callback())
                    .delete("/video/note/" + id)
                    .expect(200);
            });

            it("should return status 404 for non-existent video cards", async () => {
                await request(app.callback())
                    .delete("/video/note/a")
                    .expect(404);
            });
        });
    });
});
