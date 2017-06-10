const express = require('express');
var app = express();
const router = express.Router();
var mongoose = require('mongoose');
app.use(express.static('dist'))


// mongoose.connect('mongodb://localhost:27017/msv4')
// .then(() =>  console.log('connection succesful :: mongodb'))
// .catch((err) => console.error(err));

// // Create a schema
// var usernames = new mongoose.Schema({
// 	username: String,
// 	password: String
// });	

// var users=mongoose.model('blogusers',usernames);
// /* GET api listing. */
//  router.get('/usernames', (req, res) => {
// 		users.findOne({"username":"manjeet"},function(err, users) {
// 			if (err){ 
// 				return console.error(err);
// 			}		
// 			else {
// 				res.json(users);
// 			}
// 		});
//  });

module.exports = router;