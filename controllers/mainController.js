const fs = require("fs");

const output = {
  main: (req, res) => {
    res.render("index/main");
  },
};

module.exports = {
  output,
};
