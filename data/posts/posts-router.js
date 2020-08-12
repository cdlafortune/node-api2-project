const express = require("express");
const db = require("../db");

const router = express.Router();

//GET
//get all posts
router.get("/posts", (req, res) => {
  db.find()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        errorMessage: "Posts not found.",
      });
    });
});

//get post by ID
router.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then((post) => {
      if (post) {
        res.json(post);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ errorMessage: "Post not found." });
    });
});

//get all comments on a post 
router.get('/posts/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then((comment) => {
      if (!comment) {
        res.status(400).json({errorMessage: "The post with the specified ID does not exist."})
      }
      else {
        res.status(200).json(comment)
      }
    })
    .catch((err) => {
      res.status(500).json({errorMessage: "The comments information could not be retrieved."})
    })
});

//POST
//create new post
router.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide a title and content for the post.",
    });

    return;
  }

  try {
    const newPost = db.insert(req.body);
    res.status(201).json(newPost);
  } catch {
    res.status(500).json({
      errorMessage:
        "There was an error while saving this post to the database.",
    });
  }
});

//create comment on posts
router.post("/posts/:id/comments", (req, res) => {
  db.insertComment({text: req.body.text, post_id: req.params.id})
    .then((comment) => {
      if (comment) {
        res.status(201).json(comment);
      } else if (!req.body.id) {
        res.status(400).json({ errorMessage: "The post with the specified ID does not exist." });
      } else if (!req.body.text) {
        res  
          .status(400)
          .json({ errorMessage: "Please provide text for this comment." });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage:
          "There was an error while saving this comment to the database.",
      });
    });
});

//PUT
//update a post
router.put("/posts/:id", (req, res) => {
  db.findById(req.params.id)
  .then((post) => {
    if (!post) {
      res.status(404).json({ errorMessage: "Post not found." });
    } else if (!req.body.title || !req.body.contents) {
      res.status(400).json({
        errorMessage: "Please provide a title and content for the post.",
      });

      return;
    }

    try {
      db.update(req.params.id, req.body).then((postUpdates) => {
        if (postUpdates) {
          res.status(201).json(updatedPost);
        }
      });
    } catch {
      res.status(500).json({
        errorMessage:
          "There was an error while saving this post to the database.",
      });
    }
  });
});

//DELETE
//delete a post
router.delete("/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then((el) => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(404).json({ errorMessage: "Post not found." });
    });
});

module.exports = router;
