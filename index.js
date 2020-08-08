const express = require("express");
const db = require("./data/db");
const server = express();
// const shortid = require('shortid');

server.use(express.json());



server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
  });