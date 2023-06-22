const itemModel = require("../models/itemModel");

exports.index = async (req, res) => {
  const items = await itemModel.getItems();
  res.render("quote/index", { items: items });
};

exports.showAdd = (req, res) => {
  res.render("quote/add");
};

exports.add = async (req, res) => {
  await itemModel.addItem(req.body);
  res.redirect("/items");
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await itemModel.deleteItem(id);
  res.redirect("/items");
};

exports.showEdit = async (req, res) => {
  const items = await itemModel.getItems();
  const item = items.find((item) => item.id === req.params.id);
  res.render("quote/modify", { item: item });
};

exports.edit = async (req, res) => {
  await itemModel.editItem({ ...req.body, id: req.params.id });
  res.redirect("/items");
};

exports.showDetail = async (req, res) => {
  const id = Number(req.params.id);
  const item = await itemModel.getItem(req.params.id);
  res.render("quote/detail", { item });
};

exports.showTracking = async (req, res) => {
  const id = req.params.id; // Get the ID from the URL
  const item = await Item.findById(id); // Find the item with this ID (replace this with your own logic)

  if (!item) {
    return res.status(404).send("Item not found");
  }

  res.render("tracking", { item: item }); // Render a 'tracking' view and pass the item data to it
};

exports.showAddTracking = async (req, res) => {
  const id = req.params.id; // Get the ID from the URL
  const item = await Item.findById(id); // Find the item with this ID

  if (!item) {
    return res.status(404).send("Item not found");
  }

  // Render the 'addtracking' view and pass the item to it
  res.render("addtracking", { item: item });
};

exports.addTracking = async (req, res) => {
  const id = req.params.id; // Get the ID from the URL
  const item = await Item.findById(id); // Find the item with this ID

  if (!item) {
    return res.status(404).send("Item not found");
  }

  // Extract tracking info from request body
  const trackingInfo = req.body.trackingInfo;

  // Add tracking info to item. This will depend on your item model and how you're storing tracking info
  item.trackingInfo.push(trackingInfo);

  // Save the updated item
  await item.save();

  // Redirect to the item detail page
  res.redirect(`/items/detail/${id}`);
};
