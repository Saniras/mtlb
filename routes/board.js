const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");

router.get("/", boardController.process.index);

router.get("/write", boardController.process.writePage);

router.post("/write", boardController.process.write);

router.get("/:id", boardController.process.detail);

router.get("/:id/update", boardController.process.update);

router.delete("/:id", boardController.process.delete);

module.exports = router;
