const express = require("express");
const router = express.Router();

const mainRouter = require("./main");
const boardRouter = require("./board");

router.use("/", mainRouter);
router.use("/board", boardRouter);

module.exports = router;
