const VideoNote = require("../model/videoNote");

async function createVideoNote(ctx) {
    try {
        const data = ctx.request.body;
        ctx.body = await VideoNote.createVideoNote(data.video, data.text, data.time);
        ctx.status = 201;
    } catch (err) {
        ctx.body = {error: err.message};
        ctx.status = 400;
    }
}

async function retrieveVideoNotes(ctx) {
    try {
        ctx.body = await VideoNote.getVideoNotes(ctx.params.card);
        ctx.status = 200;
    } catch {
        ctx.status = 404;
    }
}

async function updateNoteText(ctx) {
    try {
        ctx.body = await VideoNote.updateNoteText(ctx.params.id, ctx.request.body);
        ctx.status = 200;
    } catch {
        ctx.status = 404;
    }
}

async function deleteVideoNote(ctx) {
    try {
        ctx.body = await VideoNote.deleteVideoNote(ctx.params.id);
        ctx.status = 200;
    } catch {
        ctx.status = 404;
    }
}

module.exports = {createVideoNote, retrieveVideoNotes, updateNoteText, deleteVideoNote};
