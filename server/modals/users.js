const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var app = express();
app.use(express.static('dist'));

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mscreativepixel_db')
  .then(() =>  console.log('connection successful :: mongodb_mscreativepixel_db'))
  .catch((err) => console.error(err));
var db = mongoose.connection;
 
 // Create a schema
var blogusers = new mongoose.Schema({
  username: String,
  password: String
});

// Create a model based on the schema
var users = mongoose.model('blogusers',blogusers);
 // handler for the /user/:id path, which renders a special page
router.post('/blogusers', function (req, res, next) {
  users.findOne({username:req.body.username, password:req.body.password},function(err, users) {
    var userObj = { "status": "", "body":"" };
			if (err){ 
        res.json(userObj) 
      }
      if(users != null){
        if(users.username && users.password) {
          userObj.status = "msv4-accepted";
          userObj.body = req.body;
          res.json(userObj);
        }
      } else {
          userObj.status = "msv4-rejected";
          userObj.body = req.body;
          res.json(userObj);
      }
		});

});

router.get('/blogusers', function (req, res, next) {
  users.find(function(err, users) {
			if (err){ 
        res.json(err) 
      }
      else {
        res.json(users)
      }
		});

});

router.delete('/blogusers:_id', function (req, res, next) {
  users.remove({ _id: req.params._id }, function(err, users) {
      if (err)
        res.send(err); 
      else {
        res.send({ message: ' Successfully deleted' });
      }
    });

});

router.post('/blogusers/user', function (req, res, next) {
  var blogusersqeqwe = new users(req.body);      // create a new instance of the users model
  var userObj = { "status": "", "body":"" };
  blogusersqeqwe.save(function(err, users) {
      if (err)  
        res.send(err); 
      else {
        res.json(req.body);
      }
    });
});

 
module.exports = users; 
module.exports = router;