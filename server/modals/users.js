const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var app = express();
app.use(express.static('dist'));

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mscreativepixel_db')
  .then(() =>  console.log('connection succesful :: mongodb_mscreativepixel_db'))
  .catch((err) => console.error(err));
var db = mongoose.connection;
 
 // Create a schema
var blogusers = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model based on the schema
var users=mongoose.model('blogusers',blogusers);

/* GET api listing. */
 router.get('/blogusers', (req, res) => {
		users.findOne({"username":"manjeet"},function(err, users) {
			if (err){ 
				return console.error(err);
			}		
			else {
				res.json(users);
			}
		});

 }); 
 
 
module.exports = mongoose.model('blogusers', blogusers); 
module.exports = router;