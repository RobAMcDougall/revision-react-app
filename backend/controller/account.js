const Account = require("../model/account");
const Session = require("../model/session");
const bcrypt = require("bcryptjs");

async function register(ctx){
    try {
        const data = ctx.request.body;
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        ctx.status = 201;
        ctx.body = await Account.createAccount(data);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {error: err.message};
    }
}

async function login(ctx) {
    try {
        const data = ctx.request.body;
        const account = await Account.getAccount(data.username);
        
        if (!await bcrypt.compare(data.password, account.password)) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("Invalid credentials.");
        } else {
            ctx.body = await Session.createSession(account.id);
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {error: err.message};
    }
}

async function logout(ctx) {
    try {
        await Session.destroySession(ctx.request.get("Authorization"));
        ctx.status = 204;
    } catch (err) {
        ctx.status = 400;
        ctx.body = {error: err.message};
    }
}

module.exports = {register, login, logout};
