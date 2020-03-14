// DEPENDENCIES
const path = require("path");


// ROUTING
module.exports = function (app) {
  // HTML GET Requests


  // --------------------------------------------------------------------------
  app.get("/notes", function (req, res) {
    res.sendFile(path.resolve("public", "notes.html"));
  });

    // If no matching route is found default to home
    app.get("*", function (req, res) {
      res.sendFile(path.resolve("public", "index.html"));
    });


};
