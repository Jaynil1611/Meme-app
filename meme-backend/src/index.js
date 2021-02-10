require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database");

app.use(express.json());

app.get("/memes", function (req, res, next) {
  connection.query(
    "SELECT * FROM `memeinfo` ORDER BY id DESC LIMIT 100",
    function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0)
        return res.status(404).send("There are no memes found!");
      res.json(results);
    }
  );
});

app.get("/memes/:id", function (req, res, next) {
  connection.query(
    "SELECT * FROM `memeinfo` WHERE id = ? LIMIT 1",
    req.params.id,
    function (error, results, fields) {
      if (error) throw error;
      if (results.length === 0)
        return res.status(404).send("Meme with given id cannot be found");
      res.send(results);
    }
  );
});

app.post("/memes", (req, res) => {
  const { name, url, caption } = req.body;
  connection.query(
    `INSERT INTO memeinfo (name,url,caption) VALUES('${name}','${url}','${caption}')`,
    (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    }
  );
});

app.set("port", process.env.PORT || 3000);
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Meme backend running on ${process.env.PORT} ...`);
});
