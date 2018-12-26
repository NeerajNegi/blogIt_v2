const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');
const Blog = require('../models/blog');

const validateToken = require('../middlewares/validateToken');

//Get all comments
router.get('/', validateToken, (req, res) => {
    Comment.find( (err, comments) => {
        if(err) {
            res.status(400).send({
                message: 'Error while getting Comments'
            })
        } else {
            res.json(comments);
        }
    })
})

//post a comment
router.post('/:blogId', validateToken, (req, res) => {
    Blog.find({_id: req.params.blogId}, (err, blog) => {
        if(err) {
            console.log(err);
             res.status(400).send({
                message: 'Error while getting Comments'
            })
        } else {
            if(blog.length > 0) {
                let newComment = new Comment();
                newComment.title = req.body.title,
                newComment.content = req.body.content,
                newComment.blog_id = blog._id,
                newComment.author_id = req.body.author_id,
                newComment.author_name = req.body.author_name
                newComment.save((e, comment) => {
                    if(e) {
                        res.status(400).send({
                            message: 'Error while getting Comments'
                        })
                    }
                    res.status(200).send({
                        message: 'Comment Added Successfully',
                        comment
                    })
                })
            } else {
                res.status(400).send({
                    message: 'No such blog exist'
                })
            }
        }
        
    })
})

//get all comments for a blog
router.get('/:commentId', validateToken, (req, res) => {
    Comment.find({blog_id: req.params.commentId}, (err, comments) => {
        if(err) {
            res.status(400).send({
                message : 'Error getting the comment'
            })
        } else {
            res.status(200).send({
                message: 'Comment received',
                comments
            })
        }
    })
})


//delete a comment
router.delete('/:blogId/:commentid', validateToken, (req, res) => {
    Blog.find({_id: req.params.id}, (err, blog) => {
        if(err) {
            res.status(400).send({
                message : 'some error occured'
            })
        } else {
            if(blog.length > 0){
                Comment.remove({_id: req.params.commentId}, (e, result) => {
                    if(e) {
                        res.status(400).send({
                            message : 'Error while deleting comment'
                        })
                    } else {
                        res.status(200).send({
                            message: 'Comment removd successfully'
                        })
                    }
                })
            } else {
                res.status(403).send({
                    message : 'No such blog exists'
                })
            }
        }
    })
})

module.exports = router;