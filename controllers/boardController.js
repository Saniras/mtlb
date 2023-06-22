const Board = require("../models/board");
const fs = require("fs");

const process = {
  index: (req, res, next) => {
    fs.readFile("data/board.json", (err, data) => {
      if (err) {
        next(err);
      } else {
        const boardList = JSON.parse(data);
        boardList.reverse();
        res.render("board/index", { boardList });
      }
    });
  },
  detail: (req, res, next) => {
    const id = req.params.id;
    fs.readFile("data/board.json", (err, data) => {
      if (err) {
        next(err);
      } else {
        const boardList = JSON.parse(data);
        const board = boardList.find((board) => board.id === parseInt(id));
        if (board) {
          res.render("board/detail", { board });
        } else {
          const error = new Error("Not Found");
          error.status = 404;
          next(error);
        }
      }
    });
  },
  writePage: (req, res) => {
    res.render("board/write");
  },

  write: (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    fs.readFile("data/board.json", (err, data) => {
      if (err) {
        next(err);
      } else {
        const boardList = JSON.parse(data);
        const newBoard = new Board(title, author, content);
        newBoard.id = boardList.length + 1;
        boardList.push(newBoard);
        const newData = JSON.stringify(boardList);
        fs.writeFile("data/board.json", newData, (err) => {
          if (err) {
            next(err);
          } else {
            res.redirect("/board");
          }
        });
      }
    });
  },
  updatePage: (req, res, next) => {
    const id = req.params.id;
    fs.readFile("data/board.json", (err, data) => {
      if (err) {
        next(err);
      } else {
        const boardList = JSON.parse(data);
        const board = boardList.find((board) => board.id === parseInt(id));
        if (board) {
          res.render("board/update", { board });
        } else {
          const error = new Error("Not Found");
          error.status = 404;
          next(error);
        }
      }
    });
  },
  update: (req, res, next) => {
    const id = req.params.id;
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    fs.readFile("data/board.json", (err, data) => {
      if (err) {
        next(err);
      } else {
        const boardList = JSON.parse(data);
        const index = boardList.findIndex((board) => board.id === parseInt(id));
        if (index !== -1) {
          boardList[index].title = title;
          boardList[index].author = author;
          boardList[index].content = content;
          const newData = JSON.stringify(boardList);
          fs.writeFile("data/board.json", newData, (err) => {
            if (err) {
              next(err);
            } else {
              res.redirect(`/board/${id}`);
            }
          });
        } else {
          const error = new Error("Not Found");
          error.status = 404;
          next(error);
        }
      }
    });
  },
  delete: (req, res, next) => {
    const id = req.params.id;

    fs.readFile("data/board.json", (err, data) => {
      if (err) {
        next(err);
      } else {
        const boardList = JSON.parse(data);
        const updateBoardList = boardList.filter(
          (board) => board.id !== parseInt(id)
        );
        const newData = JSON.stringify(updatedBoardList);
        fs.writeFile("data/board.json", newData, (err) => {
          if (err) {
            next(err);
          } else {
            res.redirect("/board");
          }
        });
      }
    });
  },
};

module.exports = {
  process,
};
