const fs = require("fs");

// LOAD DATA
const notesDb = require("../db/db.json");
const db = "./db/db.json";

// ROUTING

module.exports = function(app) {
  // API GET Requests
  // ----------------------------------------
  app.get("/api/notes", function(req, res) {
    res.json(notesDb);
  });

  app.get("/api/notes/:id", (req, res) => {
    res.json(notesDb.id);
  });

  // API POST Requests
  // ----------------------------------------
  // Post to api/db
  app.post("/api/notes", function(req, res) {
    // Create array to store notes from db + new note
    const newNote = {
      id: notesDb.length + 1,
      title: req.body.title,
      text: req.body.text
    };

    notesDb.push(newNote);
    fs.writeFile(db, JSON.stringify(notesDb), () => {
      console.log("There's a new note!");
    });
    res.json(newNote);
  });

  //Delete specific note
  app.delete("/api/notes/:id", function(req, res) {
    const arrIndexNum = req.params.id - 1;
    const db = "./db/db.json";

    notesDb.splice(arrIndexNum, 1);
    for (let i = 0; i < notesDb.length; i++) {
      notesDb[i].id = i + 1;
    }
    fs.writeFile(db, JSON.stringify(notesDb), () => {
      console.log("Deleted Note");
    });
    res.json(true);
    res.json(notesDb);
  });
};
