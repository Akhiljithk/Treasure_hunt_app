const mongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
const state = {
  db: null,
};

module.exports.connect = function (done) {
  // use ur mongodb url
  // all routes in player.js
  // const url =
  //   "mongodb+srv://root:root@cluster0.xouka94.mongodb.net/?retryWrites=true&w=majority";
  const url = "mongodb://localhost:27017";
  // const url = 'mongodb://0.0.0.0:27017/';
  const dbName = "treasurehunt";
  //mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
  return new Promise(async (resolve, reject) => {
    await mongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, data) => {
        if (err) return done(err);
        state.db = data.db(dbName);
        done();
      }
    );
  });
};

module.exports.get = function () {
  return state.db;
};
