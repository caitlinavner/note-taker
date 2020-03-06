const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuidv1 = require("uuidv1");

console.log(uuidv1());

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*  GET REQUEST */
app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", function(err, contents) {
    var words = JSON.parse(contents);
    res.send(words);
  });
});

/*  POST REQUEST */
app.post("/api/notes", (req, res) => {
  fs.readFile("db/db.json", (err, data) => {
    // Check for error
    if (err) throw err;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv1()
    };
    // Add data to existing json array
    json.push(note);

    // Write updated json to array
    fs.writeFile("db/db.json", JSON.stringify(json, null, 2), err => {
      // Check for error
      if (err) throw err;
      res.send("200");
    });
  });
});

/* DELETE REQUEST */
app.delete("/api/notes/:id", function(req, res) {
  try {
    notesData = fs.readFileSync("db/db.json", "utf8");
    notesData = JSON.parse(notesData);
    notesData = notesData.filter(function(note) {
      return note.id != req.params.id;
    });
    notesData = JSON.stringify(notesData);
    fs.writeFile("db/db.json", notesData, "utf8", function(err) {
      if (err) throw err;
    });

    res.send(JSON.parse(notesData));
  } catch (err) {
    throw err;
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8001;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
