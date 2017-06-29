const Promise = require('bluebird');
const difference = require('underscore').difference;
const options = {
    promiseLib: Promise
};
const pgp = require('pg-promise')(options);
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'mydb',
    user: 'postgres',
    password: 'postgres'
};
const db = pgp(cn);
exports.db = db;
exports.query = function(queryStr, callback){

  db.any(queryStr, [true])
    .then(data => {
        callback(data);
    })
    .catch(error => {
        callback(error);
    })
    .finally(() => {
        pgp.end();
    });

};

let getImage = (id, part, callback) => {
  db.any(`select _path from ${part} where id = ${id}`)
    .then(path => {
      // console.log(path);
      // return path[0]._path;
      // console.log('this is consolelog', path[0]._path);
      callback(path[0]._path);
    })
    .catch(err => {
      console.log(err);
  });

}

exports.getRandomImage = (part,callback) => {
  db.any(`select id from ${part} order by id desc limit 1`)
    .then(maxId => {
      var id = maxId[0].id;
      return Math.floor(Math.random() * (id)) + 1;
    })
    .then(id => {
      // console.log(part);
      // console.log(id);
      getImage(id, part, callback);
    })
    .catch(error => {
      console.log(error);
  });
};

exports.getTwoImages = function(part, callback) {
  let arr1 = ['head', 'torso', 'legs'];
  let diff = difference(arr1, [part]);
  let partObj = {};

  console.log(getRandomImage('head'));
  // iterate diff 
  diff.forEach((each) => {
    let obj = {};
    getRandomImage(each, (data) => {
      obj[each] = data;
      partObj[each] = obj;
    });
  })
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    callback(err);
  });

};

// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/exquisite');

// var db = mongoose.connection;

// db.on('error', function() {
//   console.log('mongoose connection error');
// });

// db.once('open', function() {
//   console.log('mongoose connected successfully');
// });

// var userSchema = mongoose.Schema({  
//   facebook: {
//     id: String,
//     token: String,
//     email: String,
//     name: String,
//     username: String,
//   }
// });
// module.exports = mongoose.model('User', userSchema);
// {obj{head: abc_path}, obj{torso: def_path}}






 
 
