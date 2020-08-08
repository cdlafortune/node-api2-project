const express = require("express");
const db = require("./data/db");
const server = express();
// const shortid = require('shortid');

server.use(express.json());

//GET
//get all posts
server.get("/posts", (req, res) => {
  const posts = db.find();

  return posts;
});

//get post by ID
server.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = db.findById(id);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ errorMessage: "Post not found." });
  }
});

//POST
//create new post
server.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide a title and content for the post.",
      });

    return;
  }

  try {
    const newPost = db.insert(req.body);
    res.status(201).json(newPost);
  } catch {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving this post to the database.",
      });
  }
});

//create comment on posts
server.post("/posts/:id/comments", (req, res) => {
  if (!req.body.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a text for the comment." });

    return;
  }

  try {
    const newComment = db.insertComment(req.body);
    res.status(201).json(newComment);
  } catch {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving this comment to the database.",
      });
  }
});

//PUT
//update a post
server.put("/posts/:id", (req, res) => {
  const post = db.findById(req.params.id);

  if (!post) {
    res.status(404).json({ errorMessage: "Post not found." });
  } else if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({
        errorMessage: "Please provide a title and content for the post.",
      });

    return;
  }

  try {
    const updatedPost = db.update(req.params.id, req.body);
    res.status(201).json(updatedPost);
  } catch {
    res
      .status(500)
      .json({
        errorMessage:
          "There was an error while saving this post to the database.",
      });
  }
});

//DELETE
//delete a post

server.listen(6000, () => {
  console.log("Server is running on http://localhost:5000");
});
