const express = require("express");
const server = express();
const postRouter = require("./posts-router");

server.use(express.json());
server.use(postRouter);


server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
