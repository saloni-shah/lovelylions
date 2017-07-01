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
    user: 'vincentla',
    password: ''
};

if (process.env.DATABASE_URL) {
  pgp.pg.defaults.ssl = true;
};
const db = pgp(process.env.DATABASE_URL || cn);

let query = function(queryStr, callback){
  // simple function for querying the db
  db.query(queryStr)

    .then(data => {
        callback(data);
   })
    .catch(error => {
        callback(error);
   });
};

let getImage = (id, part, callback) => {

  //helper function, get image from particular table with specfic id(PRIMARY KEY)
  db.any(`select _path from ${part} where id = ${id}`)
    .then(path => {
      callback(path[0]._path);
    })
    .catch(err => {
      console.log(err);
  });
};






let getRandomImage = (part,callback) => {

  db.any(`select id from ${part} order by id desc limit 1`)
    .then(maxId => {
      var id = maxId[0].id;
      return Math.floor(Math.random() * (id)) + 1;
    })
    .then(id => {
      getImage(id, part, callback);
    })
    .catch(error => {
      console.log(error);
  });
};




let getTwoImages = (part, callback) => {
  // provide the part of body and this function will return two random image fragments of the other two parts.
    // e.g. if you give it 'head', it gives you torso image and leg image

  let arr1 = ['head', 'torso', 'legs'];
  let diff = difference(arr1, [part]);
  let partA = diff[0], partB = diff[1];

  var obj = {};
  getRandomImage(partA, (data) => {
    obj[partA] = data;
    getRandomImage(partB, (data) => {
      obj[partB] = data;
      callback(obj)

    });
  });




};




let savePartImage = (userId, part, path) => {
  // this function save part image to the database, e.g. save the HEAD image path and USERID to table HEAD
  var queryStr = `insert into ${part} (_path, user_id) values ('${path}', ${userId})`;
  query(queryStr, (data) => {
    console.log(data);
  });
};

let getAllFinalImagesOfArtist = (id, callback) => {
  // this function takes an USERID which query the database for all images relate to the specific artist from final_image table
  var queryStr = `select fi.id , h._path head_path, t._path torso_path, l._path legs_path from final_image fi left join head h on (h.id = fi.head_id) left join torso t on (t.id = fi.torso_id) left join legs l on (l.id = fi.legs_id) where fi.user_id = ${id}`;
  query(queryStr, (data) => {
    callback(data);
  });
};


module.exports = {
  query: query,
  getImage: getImage,
  getRandomImage: getRandomImage,
  getTwoImages: getTwoImages,
  savePartImage: savePartImage,
  getAllFinalImagesOfArtist: getAllFinalImagesOfArtist,
  db: db
};
