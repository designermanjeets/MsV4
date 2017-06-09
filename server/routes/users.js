var express = require('express');
var router = express.Router();
 
// /* GET All Todos */
// router.get('/blogusers', function(req, res, next) {
//     db.todos.find(function(err, blogusers) {
//         if (err) {
//             res.send(err);
//         } else {
//             res.json(blogusers);
//             console.log(blogusers);
//         }
//     });
// });

// load mongoose package
var mongoose = require('mongoose');
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogusers')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
 
 
module.exports = router;