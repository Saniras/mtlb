const fs = require("fs-extra");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "/data/data.json");

async function getItems() {
  return await fs.readJson(DATA_FILE);
}

async function addItem(item) {
  const items = await getItems();

  // Get the maximum id from the current items
  let maxId = Math.max(...items.map((item) => Number(item.id)), 0);

  // Assign the new ID to the item
  item.id = String(maxId + 1);

  items.push(item);
  await fs.writeJson(DATA_FILE, items);
}

async function deleteItem(id) {
  let items = await getItems();
  items = items.filter((item) => item.id !== id);
  await fs.writeJson(DATA_FILE, items);
}

async function editItem(updatedItem) {
  let items = await getItems();
  items = items.map((item) =>
    item.id === updatedItem.id ? updatedItem : item
  );
  await fs.writeJson(DATA_FILE, items);
}

async function getItem(id) {
  let items = await getItems();
  return items.find((item) => item.id === id);
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
  editItem,
  getItem,
};
