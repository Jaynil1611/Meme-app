const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { pool } = require("./database");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/memes", function (req, res) {
  pool.query(
    "SELECT * FROM memeinfo ORDER BY id DESC LIMIT 100",
    function (error, results) {
      if (error) throw error;
      if (results.rows.length === 0)
        return res.status(404).send("There are no memes found!");
      res.status(200).json(results.rows);
    }
  );
});

app.get("/memes/:id", function (req, res) {
  pool.query(
    "SELECT * FROM memeinfo WHERE id = $1 LIMIT 1",
    [req.params.id],
    function (error, results) {
      if (error) throw error;
      if (results.rows.length === 0)
        return res.status(404).send("Meme with given id cannot be found");
      res.status(200).json(results.rows);
    }
  );
});

app.post("/memes", (req, res) => {
  const { name, url, caption } = req.body;
  pool.query(
    "INSERT INTO memeinfo (name,url,caption) VALUES($1,$2,$3)",
    [name, url, caption],
    (error, results) => {
      if (error) throw error;
      res.status(201).json({ status: "success", message: "Meme added." });
    }
  );
});

app.get("/", (req, res) => res.send("Welcome to XMeme!"));

app.set("port", process.env.PORT || 3000);
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Meme backend running on ${process.env.PORT} ...`);
});
