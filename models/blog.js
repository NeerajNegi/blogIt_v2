const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({ 
	authorId: String,
	imageUrl: String,
	createdAt: String,
	content:{
		type: String,
		required: true
	},
	title: String,
	likes: [String]
});

BlogSchema.methods.like = function(userId){
	const pos = this.likes.indexOf(userId);
	if( pos === -1) {
		// add user id to likes array for a fresh like
		this.likes.push(userId);
	} else {
		//if likes array contains user id then remove it 
		// i.e. double click to dislike
		this.likes.splice(pos, 1);
	}
}

const Blog = module.exports = mongoose.model('Blog', BlogSchema);
