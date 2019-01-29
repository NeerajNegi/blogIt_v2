const mongoose = require('mongoose');

const suggestionSchema = mongoose.Schema({
    title: String,
    content: String
});

const Suggestion = module.exports =  mongoose.model('Suggestion', suggestionSchema);
