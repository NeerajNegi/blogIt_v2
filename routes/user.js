const express = require('express');
const router = express.Router();
const generateToken = require('../middlewares/generateToken');
const validateToken = require('../middlewares/validateToken');

//importing User Schema
const User = require('../models/user');

//retrieving Users
router.get('/',  (req, res, next)=>{
	User.find( (err, Users)=>{
		res.json(Users);
	});
});

//login user
router.post('/login', (req, res)=>{
	User.findOne({email : req.body.email}, function(err, user){
		if(user === null){
			console.log(err);
			console.log("No such user found !");
			return res.status(400).send({
				message: "User not found."
			});
		} else {
			if(user.validPassword(req.body.password)){
				const token = generateToken(user.email)
				console.log("User logged in");
				return res.status(201).send({
					message: "User Logged In",
					userInfo: {
						email: user.email,
						id: user._id,
						firstName: user.firstName,
						lastName: user.lastName,
						photoUrl: user.photoUrl
					},
					token: token
				});
			} else {
				console.log("Wrong password");
				return res.status(400).send({
					message: "Wrong Password"
				});
			}
		}
	});
});

//add user
router.post('/',(req, res)=>{
	User.find({email: req.body.email}, function(err, user){
		if(user.length > 0){
			console.log("user already exist.");
			res.status(400).send({
				message: "User already exist."
			});
		} else {
			let newUser = new User();

			newUser.firstName = req.body.firstName
			newUser.lastName = req.body.lastName
			newUser.email = req.body.email
			newUser.photoUrl = req.body.photoUrl

			newUser.setPassword(req.body.password);

			newUser.save( (err, User)=>{
				if(err){
					console.log(err);
					return res.status(400).send({
						message: "Failed to add user."
					});
				} else {
					return res.status(201).send({
						message: "User added succesfully."
					});
				}
			});
		}
	})
});

//update user
router.put('/:id', validateToken, (req, res) => {
	User.find({_id: req.params.id}, (err, user) => {
		if(err){
			console.log(err);
			res.status(400).send({
				message: 'Some error has occured'
			});
		} else {
			if(user.length > 0) {
				console.log(user);
				user.firstName = req.body.firstName,
				user.lastName = req.body.lastName

				user.save( (e, u) => {
					if(e) {
						res.status(400).send({
							message: 'Error occured while updating user'
						})
					} else {
						res.status(200).send({
							message: 'User updated Successfully',
							user: u
						})
					}
				})
			} else {
				res.status(403).send({
					message: 'No such user found'
				})
			}
		}
	})
})

//deleting Users
router.delete('/:id', validateToken, (req, res)=>{
	User.remove({_id: req.params.id}, (err, result)=>{
		if(err){
			res.json(err);
		} else {
			res.status(200).send({
				message : 'User Removed Successfully'
			})
		}
	});
});

module.exports = router;
