var fs = require("fs");
var file = "./test.db";

var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database(file);

db.serialize(function() {
    //db.run 如果 Staff 資料表不存在，那就建立 Staff 資料表
    db.run("CREATE TABLE IF NOT EXISTS  Speaker (thing TEXT)");
    var stmt = db.prepare("INSERT INTO Speaker VALUES (?)");
    
    //寫進10筆資料
    for (var i = 0; i<10; i++) {
      stmt.run("Speaker ID" + i);
    }
  
    stmt.finalize();
  
    db.each("SELECT rowid AS id, thing FROM Speaker", function(err, row) {
      //log 出所有的資料
      console.log(row.id + ": " + row.thing);
    });
  });
  
db.close();
