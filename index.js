const express = require("express");
const server = express();
const postRouter = require("./data/posts/posts-router");

server.use(express.json());
server.use(postRouter);

server.get('/', (res, req) => {
  res.send("<h1> Welcome to my blog </h1>");
});

server.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
