const mongoose = require('mongoose');
var crypto = require('crypto');

const UserSchema = mongoose.Schema({
	firstName:{
		type: String,
		required: true
	},
	lastName:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required: true
	},
	photoUrl:{
		type: String,
		required: true
	},
	hash: String,
	salt: String
});

//method to set salt and hash the password for a user
UserSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

//method to check entered password is correct or not
UserSchema.methods.validPassword = function(password){
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
	return this.hash === hash;	
};

const User = module.exports = mongoose.model('User', UserSchema);
