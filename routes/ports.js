const express = require("express");
const router = express.Router();
const portController = require("../controllers/portController");

router.get("/", portController.index);
router.get("/api/stations/:id/realtime", portController.getRealtimeData);

// Add similar routes for other endpoints...

module.exports = router;
