const fs = require("fs");

const noteData = require("../db/db.json");

module.exports = function(app) {
  function writeToDB(notes) {
    // Converts new JSON Array back to string
    notes = JSON.stringify(notes);
    console.log(notes);
    // Writes String back to db.json
    fs.writeFileSync("./db/db.json", notes, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  // GET method
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  //POST method

  app.post("/api/notes", function(req, res) {
    // Set unique id to entry
    if (noteData.length == 0) {
      req.body.id = "0";
    } else {
      req.body.id = JSON.stringify(
        JSON.parse(noteData[noteData.length - 1].id) + 1
      );
    }

    console.log("req.body.id: " + req.body.id);

    // push body to JSON
    noteData.push(req.body);

    // note data to DB
    writeToDB(noteData);
    console.log(noteData);

    // return note with JSON
    res.json(req.body);
  });

  // DELETE method

  app.delete("/api/notes/:id", function(req, res) {
    // converts id to a string
    let id = req.params.id.toString();
    console.log(id);

    // filter notesArray for id
    for (i = 0; i < noteData.length; i++) {
      if (noteData[i].id == id) {
        console.log("match!");
        // respond deleted note
        res.send(noteData[i]);

        // Remove deleted note
        noteData.splice(i, 1);
        break;
      }
    }

    // Write note data to DB
    writeToDB(noteData);
  });
};
