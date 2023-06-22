const path = require("path");
const express = require("express");
const itemsRouter = require("./routes/items");
const portRouter = require("./routes/ports");
const portController = require("./controllers/portController");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Set the path for your views
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded bodies
app.use("/items", itemsRouter);
app.use("/quote", itemsRouter);
app.use("/ports", portRouter);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/data", portController.index);
app.get("/api/stations/:id/realtime", portController.getRealtimeData);
app.get(
  "/api/stations/:id/weekly-statistics",
  portController.getWeeklyStatistics
);
app.get(
  "/api/stations/:id/monthly-statistics",
  portController.getMonthlyStatistics
);
app.get(
  "/api/stations/:id/yearly-statistics",
  portController.getYearlyStatistics
);
//세계항만
app.get("/vsl", function (req, res) {
  res.render("pages/port"); // path to your EJS file without the .ejs extension
});
app.get("/api/vessel", function (req, res) {
  const csv = require("csvtojson");
  const csvFilePath = path.join(__dirname, "public", "db/vessel.csv");

  res.set("Cache-Control", "no-store"); // disable caching

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      res.json(jsonObj);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "An error occurred while converting CSV data to JSON" });
    });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
