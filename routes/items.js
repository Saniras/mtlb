const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/", itemController.index);
router.get("/add", itemController.showAdd);
router.post("/add", itemController.add);
router.post("/delete/:id", itemController.delete);
router.get("/edit/:id", itemController.showEdit);
router.post("/edit/:id", itemController.edit);
router.get("/detail/:id", itemController.showDetail);
router.get("/tracking/:id", itemController.showTracking);
router.get("/addtracking/:id", itemController.showAddTracking);
router.post("/addtracking/:id", itemController.addTracking);

module.exports = router;
