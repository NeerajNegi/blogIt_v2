const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    title: String,
    content: String,
    blog_id: String,
    author_id: String,
    author_name: String
});

const Comment = module.exports =  mongoose.model('Comment', commentSchema);
