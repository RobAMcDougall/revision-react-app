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

app.use(accounts.routes());

module.exports = app;
