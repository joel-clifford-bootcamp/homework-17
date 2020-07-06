const express = require("express");

const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Add routes, both API and HTML
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouttracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

// Start the server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
