const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    title: String,
    content: String,
    blogId: String,
    authorId: String
});

const Comment = module.exports =  mongoose.model('Comment', commentSchema);
