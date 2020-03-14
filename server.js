// DEPENDENCIES
const express = require("express");
const bodyParser = require("body-parser");

// EXPRESS CONFIGURATION

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port.
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ROUTER
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// LISTENER

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
