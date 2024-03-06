const VideoCard = require("../model/videoCard");

async function createVideoCard(ctx) {
    try {
        const data = ctx.request.body;
        ctx.status = 201;
        ctx.body = await VideoCard.createVideoCard(data.account, data.video_id);
    } catch (err) {
        ctx.status = 400;
        ctx.body = {error: err.message};
    }
}

async function retrieveVideoCard(ctx) {
    try {
        ctx.body = await VideoCard.getVideoCard(ctx.params.id);
    } catch {
        ctx.status = 404;
    }
}

async function updateResumeTimestamp(ctx) {
    try {
        ctx.body = await VideoCard.updateResumeTimestamp(ctx.params.id, parseInt(ctx.body));
    } catch {
        ctx.status = isNaN(ctx.body) ? 400 : 404;
    }
}

async function deleteVideoCard(ctx) {
    try {
        ctx.body = await VideoCard.deleteVideoCard(ctx.params.id);
    } catch {
        ctx.status = 404;
    }
}

module.exports = {createVideoCard, retrieveVideoCard, updateResumeTimestamp, deleteVideoCard};
