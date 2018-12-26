//importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const morgan = require('morgan');

const app = express();

//importing routes
const user = require('./routes/user');
const blog = require('./routes/blog');
const comment = require('./routes/comment');

//connect to MongoDB
mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
	.then( () => {
		console.log('Successfully Connected to Mongo DB');
	}, (err) => {
		console.log('Some Error has occured: ', err);
	})
	.catch((err) => {
		console.log('Some error has occured: ', err);
	});

//port no;
const port = process.env.PORT || 3000;

//adding middleware
app.use(cors());
app.use(bodyparser.json());
app.use(morgan('dev'));


//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/users', user);
app.use('/api/blogs', blog);
app.use('/api/comments', comment);

app.listen(port,()=>{
	console.log("Server running at port: " + port);
});

module.exports = app;