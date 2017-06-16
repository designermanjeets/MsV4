const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var app = express();
app.use(express.static('dist'));
var MongoClient = require('mongodb').MongoClient;

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/mscreativepixel_db')
  .then(() =>  console.log('connection successful :: mongodb_mscreativepixel_db'))
  .catch((err) => console.error(err));
var db = mongoose.connection;
 
 // Create a schema
var blogusers = new mongoose.Schema({
  username: String,
  password: String,
  articles: [
    {
      postitle:  String,
      postdate: {type: Date, default: Date.now},
      author: {type: String },
      article: String
    }
  ]
});

// Create a model based on the schema
var users = mongoose.model('blogusers',blogusers);

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
          return res.json(userObj);
        }
      } else {
          userObj.status = "msv4-rejected";
          userObj.body = req.body;
          return res.json(userObj);
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
  var blogusersnew = new users(req.body);      // create a new instance of the users model
  var userObj = { "status": "", "body":"" };
  blogusersnew.save(function(err, blogusersnew) {
      if (err)  
        res.send(err); 
      else {
        res.json(blogusersnew);
      }
    });
});

router.post('/thread', function(req, res, next){
  var newthread = new users();
  users.findOneAndUpdate({"username":req.body.author},{
      $push: {
        articles:  {
          postitle: req.body.postitle, 
          postdate: req.body.postdate, 
          author: req.body.author,
          article: req.body.article
        }
      }
    },
    { upsert: true } ,
    function(err, newthread) {
      if (err)  
        res.send(err); 
      else {
        res.json(newthread);
      }
  });
});

router.post('/thread/getposts', function (req, res, next) {
  users.find({"username":req.body.username}, function(err, users) {
			if (err){ 
        res.json(err) 
      }
      else {
        res.json(users)
      }
		});

});

 
module.exports = users; 
module.exports = router;