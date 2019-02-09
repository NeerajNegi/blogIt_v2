const express = require('express');
const router = express.Router();
const generateToken = require('../middlewares/generateToken');
const validateToken = require('../middlewares/validateToken');
const request = require('request');

//importing Blog Schema
const Blog = require('../models/blog');
const User = require('../models/user');
// const Comment = require('../models/comment');

//Get All Blogs
router.get('/', (req, res) => {
	Blog.find( (err, blogs)=>{
		if(err){
			res.status(400).send({
				message: "Some error has occured."
			});
		} else {
			// blogs.
			res.status(200).send({
				message: "Blogs received",
				blogs
			});
		}
	});
});

//Get own Blogs
router.get('/ownblogs/:userId', validateToken, (req, res)=>{
	Blog.find({authorId: req.params.userId}, (err, blogs) => {
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
	newBlog.authorId = req.body.authorId;
	newBlog.content = req.body.content;
	newBlog.createdAt = req.body.createdAt;
	newBlog.title = req.body.title;
	newBlog.imageUrl = req.body.imageUrl;

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
			blog.imageUrl = req.body.imageUrl;

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
router.post('/like/:blogId', validateToken, (req, res)=>{
	Blog.findOne({_id: req.params.blogId}, function(err, blog){
		if(blog == null){
			console.log(err);
			res.status(400).send({
				message: "Some error has occured."
			});
		} else {
			blog.like(req.body.userId);
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

router.get('/findWords/:word', (req, res) => {
	const word = encodeURIComponent(req.params.word);
	const options = {
		url: 'https://api.datamuse.com/words?ml=' + word
	};

	function callback(err, response, body) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: 'Some internal Error Occured'
			});
		} else {
			if (response.statusCode === 200) {
				let result = JSON.parse(body).slice(0, 10);
				result = result.map((r) => {
					return r.word;
				});
				res.status(201).send({
					words: result
				})
			} else {
				console.log('\n Error while calling the api...');
				return res.status(400).send({
					message: 'Oops, an internal error occured'
				});
			}
		}
	}

	request.get(options, callback);
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