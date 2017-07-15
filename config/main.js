module.exports = {
  'secret': 'longobnoxiouspassphrase',
  'database': 'mongodb://localhost/mscreativepixel_db'  // mLab
};



//mongodb://lucky:manjeet@ds139242.mlab.com:39242/mscreativepixeldb //mLab 

//mongoose.connect('mongodb://localhost/mscreativepixel_db') //local

//Mongo Atlas
/*var uri = "mongodb://msdb:manjeet@mscreativepixel-shard-00-00-e2tyh.mongodb.net:27017,mscreativepixel-shard-00-01-e2tyh.mongodb.net:27017,mscreativepixel-shard-00-02-e2tyh.mongodb.net:27017/msdb?ssl=true&replicaSet=mscreativepixel-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
  console.log('connection successful :: msdb:manjeet@mscreativepixel-shard....Atlas Cluster');
  //db.close();
});*/