// Include our packages in our main server file
var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var blogusers = require('./src/app/models/user');
var articles = require('./src/app/models/articles');
var jwt = require('jsonwebtoken');
var port = 3000;

//var users = require('./server/modals/users');  // This needs to be corrected

 
// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));

// Initialize passport for use
app.use(passport.initialize());

// To Serve directory
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', function (req, res){
    res.render('index.html');
});


// Connect to database
mongoose.connect(config.database);

// Bring in defined Passport Strategy
require('./config/passport')(passport);

// Create API group routes
var apiRoutes = express.Router();


// Register new users
apiRoutes.post('/register', function(req, res) {
  if(!req.body.username || !req.body.password) {
    res.json({ success: false, message: 'Please enter username and password.' });
  } else {
    var newUser = new blogusers({
      username: req.body.username,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That username already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
apiRoutes.post('/authenticate', function(req, res) {
  blogusers.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});

//Get all users to display as a listing
apiRoutes.post('/getallusers', function (req, res, next) {
  blogusers.find(function(err, users) {
	if (err){ 
        res.json(err) 
      }
      else {
        res.json(users)
      }
	});
});

//Delete user from frontEnd
apiRoutes.delete('/getallusers:_id', function (req, res, next) {
  blogusers.remove({ _id: req.params._id }, function(err, users) {
      if (err)
        res.send(err); 
      else {
        res.send({ success: true,  message: ' Successfully deleted user' });
      }
    });

});

//Post Article 
apiRoutes.post('/thread', function(req, res, next){
  articles.findOne({author:req.body.author},function(err, users) {
    if (err) {
      res.json(err);
    } else {
      var articlesnew = new articles(req.body); // create a new instance of the articlesnew model
      articlesnew.save(function(err, articlesnew) {
        if (err)  
          res.send(err); 
        else {
          res.json(articlesnew);
        }
      });   
    } //else
  });
});

// Get all Articles
apiRoutes.post('/thread/getposts', function (req, res, next) {
  articles.find(function(err, articles) { //{author:req.body.author} for specific author
		if (err){ 
			res.json(err) 
		}
		else {
			res.json(articles)
		}
  });
});

//Get detailed on click of specific article
apiRoutes.post('/thread/userSpecificPost:_id', function (req, res, next) {
  articles.findOne({_id:req.params._id},function(err, result){
		if (err){ 
        res.json(err) 
      }
      else {
        res.json(result)
      }
  });
});

//Post comment on blog detail page
apiRoutes.post('/thread/postcomment', function(req, res, next){
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

//Load all commments on article detail load
apiRoutes.post('/thread/getcomments', function (req, res, next) {
  var ObjectID = require('mongodb').ObjectID;
  var o_id = new ObjectID(req.body.parentpost);
  articles.find({_id: o_id},function(err, articles) {
		if (err){ 
        res.json(err) 
      }
      else {
        res.json(articles)
      }
  });
});

//Post reply on comment
apiRoutes.post('/postreply', function(req, res, next){
  var ObjectID = require('mongodb').ObjectID;
  var o_id = new ObjectID(req.body.parentpost);
  articles.findOneAndUpdate({"comments._id": o_id},
  {
      $push: {
           "comments.$.replies": {
            reply     	: req.body.reply,
            authors     : req.body.author,
            parentpost  : req.body.parentpost
          }
      }
    },
    { new: true },
    function(err, replies) {
      if (err)  
        res.send(err); 
      else {
        res.json(replies);
      }
  });
});


// Set url for API:not group, evertything routes
app.use('/', apiRoutes);

// Start the server
app.listen(port);
console.log('Your server is running on port ' + port + '.');


module.exports = app;