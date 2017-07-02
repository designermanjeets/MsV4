var mongoose = require('mongoose');

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


module.exports = mongoose.model('blogarticles', blogarticles);