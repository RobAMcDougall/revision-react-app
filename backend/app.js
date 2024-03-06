const Koa = require("koa");
const app = new Koa();

const cors = require("@koa/cors");
const {koaBody} = require("koa-body");
app.use(cors()).use(koaBody());

const Router = require("@koa/router");
const controllers = require("./controller");

const accounts = new Router({prefix: "/account"});
accounts.post("/register", controllers.account.register);
accounts.post("/login", controllers.account.login);
accounts.delete("/logout", controllers.account.logout);
app.use(accounts.routes()).use(accounts.allowedMethods());

const videoCards = new Router({prefix: "/video/card"}).use(controllers.account.protect);
videoCards.post("/", controllers.video.card.createVideoCard);
videoCards.get("/:id", controllers.video.card.retrieveVideoCard);
videoCards.patch("/:id", controllers.video.card.updateResumeTimestamp);
videoCards.delete("/:id", controllers.video.card.deleteVideoCard);
app.use(videoCards.routes()).use(videoCards.allowedMethods());

const videoNotes = new Router({prefix: "/video/note"}).use(controllers.account.protect);
videoNotes.post("/", controllers.video.note.createVideoNote);
videoNotes.get("/:id", controllers.video.note.retrieveVideoNote);
videoNotes.patch("/:id", controllers.video.note.updateNoteText);
videoNotes.delete("/:id", controllers.video.note.deleteVideoNote);
app.use(videoCards.routes()).use(videoCards.allowedMethods());

module.exports = app;
