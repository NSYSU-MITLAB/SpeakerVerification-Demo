var express = require('express');
var fs = require("fs");
var router = express.Router();

var file = "./test.db";
var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database(file);

/* GET home page. */
router.get('/', function(req, res, next) {

  db.each("SELECT rowid AS id, thing FROM Speaker", function(err, row) {
    //log 出所有的資料
    console.log(row.id + ": " + row.thing);
  });
  var data = rows;


  res.sendfile('index.html', { title: 'Express' , data: data});
});

module.exports = router;
