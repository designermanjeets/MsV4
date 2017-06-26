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
 
 // Create a Blog user schema
var blogusers = new mongoose.Schema({
  username: String,
  password: String
});

 // Create a Blog Comments schema
var blogcomments = new mongoose.Schema({
    comment:  String,
    postdate: { type: Date, default: Date.now },
    author:   String
});

 // Create a Blog Articles schema
var blogarticles = new mongoose.Schema({
    postitle: String,
    postdate: { type: Date, default: Date.now },
    author:   String,
    article:  String,
    comments: [ 
      {
        comment     : String,
        postdate    : { type: Date, default: Date.now },
        authors     : String,
        parentpost  : String,
        replies :[
          {
            reply     : String,
            postdate    : { type: Date, default: Date.now },
            authors     : String,
            parentpost  : String,
          }
        ]
      }
    ]
});

// Create a model based on the schema
var users     = mongoose.model('blogusers',blogusers);
var comments  = mongoose.model('blogcomments',blogcomments);
var articles  = mongoose.model('blogarticles',blogarticles);


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
  articles.findOne({author:req.body.author},function(err, users) {
    var userObj = { "status": ""};
    if (err) {
      res.json(err);
    } else {
      var articlesnew = new articles(req.body); // create a new instance of the articlesnew model
      articlesnew.save(function(err, articlesnew) {
        if (err)  
          res.send(err); 
        else {
          console.log(articlesnew);
          res.json(articlesnew);
        }
      });   
    } //else
  });
});

router.post('/thread/getposts', function (req, res, next) {
  articles.find(function(err, articles) { //{author:req.body.author}, 
			if (err){ 
        res.json(err) 
      }
      else {
        res.json(articles)
      }
		});

});

router.post('/comment/getcomments', function (req, res, next) {
  articles.find({_id:req.body.parentpost},function(err, articles) {
			if (err){ 
        res.json(err) 
      }
      else {
        res.json(articles)
      }
		});

});


router.post('/thread/userSpecificPost:_id', function (req, res, next) {
  articles.findOne({_id:req.params._id},function(err, result){
			if (err){ 
        res.json(err) 
      }
      else {
        res.json(result)
      }
		});

});


router.post('/postcomment', function(req, res, next){
  var ObjectID = require('mongodb').ObjectID;
  var o_id = new ObjectID(req.body.parentpost);
  articles.findOneAndUpdate({_id: o_id},
  {
      $push: {
          comments: {
              comment     : req.body.comment,
              authors      : req.body.author,
              parentpost  : req.body.parentpost
          }
      }
    },{ new: true },
    function(err, articles) {
      if (err)  
        res.send(err); 
      else {
        res.json(articles);
      }
  });
});


router.post('/postreply', function(req, res, next){
  var ObjectID = require('mongodb').ObjectID;
  var o_id = new ObjectID(req.body.parentpost);
  articles.findOneAndUpdate({"comments._id": o_id},
  {
      $push: {
           "comments.$.replies": {
            reply     : req.body.reply,
            authors      : req.body.author,
            parentpost  : req.body.parentpost
          }
      }
    },
    { new: true },
    function(err, replies) {
      if (err)  
        res.send(err); 
      else {
        console.log(replies);
        res.json(replies);
      }
  });
});

router.post('/postreply/getreplies', function (req, res, next) {
  articles.find({_id:req.body.parentpost},function(err, articles) {
			if (err){ 
        res.json(err) 
      }
      else {
        res.json(articles)
      }
		});

});
 
module.exports = users;
module.exports = comments;
module.exports = articles;
module.exports = router;