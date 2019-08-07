const express = require('express');
const router = express.Router();

const postDb = require('./postDb');

router.get('/', (req, res) => {
  postDb.get().then(posts => res.status(200).json(posts));
});

router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  postDb.remove(req.post.id).then(records => {
    if (records) res.status(200).json({ message: 'Post deleted.' });
    else res.status(500).json({ message: 'Error deleting post.' });
  });
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
  postDb.update(req.post.id, req.body).then(records => {
    if (records) res.status(200).json({ message: 'Post updated.' });
    else res.status(500).json({ message: 'Error updating post.' });
  });
});

// custom middleware

function validatePostId(req, res, next) {
  req.post = { id: req.params.id };
  if (req.post.id) {
    postDb.getById(req.post.id).then(post => {
      if (post) {
        req.post = post;
        next();
      } else res.status(401).json({ message: 'Invalid Post ID' });
    });
  } else res.status(400).json({ message: 'Post ID required' });
}

function validatePost(req, res, next) {
  if (req.body && req.body.text) next();
  else if (req.body)
    res.status(400).json({ message: 'Missing required text field' });
  else res.status(400).json({ message: 'Missing post data' });
}

module.exports = router;
