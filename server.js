const express = require("express");
const fs = require("fs-extra");
const nunjucks = require("nunjucks");

const app = express();

// Configure nunjucks to use the current directory for templates
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.get("/", async (req, res) => {
  // Load the data from the JSON file
  const data = await fs.readJson("./data/board.json");

  // Render the page using nunjucks and pass in the data
  res.render("index.html", { items: data });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
