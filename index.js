const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./db.sqlite");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// initialize database (does not need to happen every time?)
db.serialize(function() {
  db.run("DROP TABLE moviestars");
  db.run("CREATE TABLE moviestars (name TEXT, birthyear INT)");
  db.run(
    "INSERT INTO moviestars (name, birthyear) VALUES ('Brad Pitt', 1953), ('Meryl Streep', 1963)"
  );
  db.each("SELECT * FROM moviestars", function(err, row) {
    console.log(row.name + ": " + row.birthyear);
  });
});

app.listen(8080, () => {
  console.log("Server started");
});

app.post("/sendNewStar", function(req, res) {
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.year);
  db.run(
    "INSERT INTO moviestars (name, birthyear) VALUES (?, ?)",
    [req.body.name, req.body.year],
    function(err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

app.get("/getStarsInfo", function(req, res) {
  db.all("SELECT * FROM moviestars", function(error, result) {
    if (error) {
      console.log(error);
      res.send("ERROR");
    } else {
      res.send(result);
    }
  });
});

/*http.listen(8080, function() {
  console.log('Listening on port 8080');
});*/

// sqlite3 resources / reference:
// https://www.codecademy.com/learn/learn-node-sqlite/modules/learn-node-sqlite-module
// https://charlietheprogrammer.com/the-best-nodejs-sqlite-tutorial-part-2
