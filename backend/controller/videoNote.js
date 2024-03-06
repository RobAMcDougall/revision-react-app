const VideoNote = require("../model/videoNote");

async function createVideoNote(ctx) {
    try {
        const data = ctx.request.body;
        ctx.status = 201;
        ctx.body = await VideoNote.createVideoNote(data.video, data.text, data.time);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {error: err.message};
    }
}

async function retrieveVideoNote(ctx) {
    try {
        ctx.body = await VideoNote.getVideoNote(ctx.params.id);
    } catch {
        ctx.status = 404;
    }
}

async function updateNoteText(ctx) {
    try {
        ctx.body = await VideoNote.updateNoteText(ctx.params.id, ctx.body);
    } catch {
        ctx.status = 404;
    }
}

async function deleteVideoNote(ctx) {
    try {
        ctx.body = await VideoNote.deleteVideoNote(ctx.params.id);
    } catch {
        ctx.status = 404;
    }
}

module.exports = {createVideoNote, retrieveVideoNote, updateNoteText, deleteVideoNote};
