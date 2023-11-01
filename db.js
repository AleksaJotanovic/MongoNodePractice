const { MongoClient } = require("mongodb");

let dbConnection;
let uri = 'mongodb://127.0.0.1:27017/bookstore';
module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(uri).then((client) => {
      dbConnection = client.db();
      return callback()
    }).catch((err) => {
      console.log(err);
      return callback(err);
    })
  },
  getDb: () => dbConnection
}
