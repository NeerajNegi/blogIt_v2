const express = require('express');
const router = express.Router();
const generateToken = require('../middlewares/generateToken');
const validateToken = require('../middlewares/validateToken');

//importing Blog Schema
const Blog = require('../models/blog');
const Comment = require('../models/comment');

//Get All Blogs
router.get('/', (req, res) => {
	Blog.find( (err, blogs)=>{
		if(err){
			res.status(400).send({
				message: "Some error has occured."
			});
		} else {
			res.status(200).send({
				message: "Blogs received",
				blogs
			});
		}
	});
});

//Get own Blogs
router.get('/ownblogs/:id', validateToken, (req, res)=>{
	Blog.find({author_id: req.params.id}, (err, blogs) => {
		if(err){
			res.status(400).send({
				message: "Error Occured"
			});
		} else {
			if(!blogs.length){
				res.status(400).send({
					message: "No blogs"
				});
			} else {
				res.status(200).send({
					message:"Blogs received",
					blogs
				});
			}
		}
	});
});

//add new Blog
router.post('/', validateToken, (req, res)=>{
	let newBlog = new Blog();
	
	newBlog.author_id = req.body.author_id;
	newBlog.author_name = req.body.author_name;
	newBlog.content = req.body.content;
	newBlog.created_at = req.body.created_at;
	newBlog.title = req.body.title;

	newBlog.save((err)=>{
		if(err){
			console.log(err);
			res.status(400).send({
				message: 'Failed to add Blog'
			});
		} else {
			console.log("Blog added");
			res.status(200).send({
				message: 'Blog Added'
			});
		}
	});
});

//update blog
//Check whether the user who is editing the blog is its author or not
router.put('/:id', validateToken, (req, res)=>{
	Blog.findOne({_id: req.params.id}, function(err, blog){
		if(err){
			console.log(err);
			res.status(400).send({
				message: "Error getting blog for updation."
			});
		} else {
			blog.content = req.body.content;
			blog.title = req.body.title;

			blog.save((e, b)=>{
				if(e){
					console.log(e);
					res.status(400).send({
						message: "Error updating blog."
					});
				} else {
					res.status(200).send({
						message: "Blog successfully updated.",
						blog: b
					});
				}
			});
		}
	});
});

//Like/Dislike Blog
router.post('/like/:id', validateToken, (req, res)=>{
	Blog.findOne({_id: req.params.id}, function(err, blog){
		if(blog == null){
			console.log(err);
			res.status(400).send({
				message: "Some error has occured."
			});
		} else {
			blog.like(req.body.user_id);
			blog.save((err, blog)=>{
				if(err){
					console.log(err);
					res.status(400).send({
						message: "Some error has occured."
					})
				} else {
					res.status(200).send({
						message: "Like/Dislike Success",
						blog: blog
					});
				}
			})
		}
	});
});

//get all comments for a blog
router.get('/comments/:blogId', validateToken,  (req, res) => {
    Comment.find({blog_id: req.params.blogId}, (err, comments) => {
        if(err) {
            res.status(400).send({
                message : 'Error getting the comment'
            })
        } else {
            res.status(200).send({
                message: 'Comments received',
                comments
            })
        }
    })
})

//get single blog
router.get('/:id', validateToken, (req, res)=>{
	console.log(req.params.id);
	Blog.findOne({_id: req.params.id}, function(err, blog){
		if(blog == null){
			console.log(err);
			res.status(400).send({
				message: "Some error has occured."
			});
		} else {
			res.status(200).send({
				message: "Blog retrieved",
				blog: blog
			});
		}
	});
});

//deleting Blog
//validate that user deleting the blog is its author or not
router.delete('/:id', validateToken, (req, res)=>{
	Blog.deleteOne({_id: req.params.id}, (err, result)=>{
		if(err){
			res.json(err);
		} else {
			res.status(200).send({
				message : 'Blog Removed Successfully'
			})
		}
	});
});
module.exports = router;