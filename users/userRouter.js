const router = require('express').Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

router.post('/', validateUser, (req, res) => {
  userDb.insert(req.body).then(newUser => {
    if (newUser)
      res.status(201).json({ message: 'User added.', user: newUser });
    else res.status(500).json({ message: 'Error adding user.' });
  });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  postDb.insert({ ...req.body, user_id: req.user.id }).then(newPost => {
    if (newPost)
      res.status(201).json({ message: 'Post added.', post: newPost });
    else res.status(500).json({ message: 'Error adding post.' });
  });
});

router.get('/', (req, res) => {
  userDb.get().then(users => res.status(200).json(users));
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  userDb.getUserPosts(req.user.id).then(posts => {
    if (posts) res.status(200).json(posts);
    else res.status(500).json({ message: 'Error deleting user.' });
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  userDb.remove(req.user.id).then(records => {
    if (records) res.status(200).json({ message: 'User deleted.' });
    else res.status(500).json({ message: 'Error deleting user.' });
  });
});

router.delete('/', (req, res) => {
  res.status(400).json({ message: 'User ID required' });
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  userDb.update(req.user.id, req.body).then(records => {
    if (records) res.status(200).json({ message: 'User updated.' });
    else res.status(500).json({ message: 'Error updating user.' });
  });
});

router.put('/', (req, res) => {
  res.status(400).json({ message: 'User ID required' });
});

//custom middleware

function validateUserId(req, res, next) {
  req.user = { id: req.params.id };
  if (req.user.id) {
    userDb.getById(req.user.id).then(user => {
      if (user) {
        req.user = user;
        next();
      } else res.status(401).json({ message: 'Invalid User ID' });
    });
  } else res.status(400).json({ message: 'User ID required' });
}

function validateUser(req, res, next) {
  if (req.body && req.body.name) next();
  else if (req.body)
    res.status(400).json({ message: 'Missing required name field' });
  else res.status(400).json({ message: 'Missing user data' });
}

function validatePost(req, res, next) {
  if (req.body && req.body.text) next();
  else if (req.body)
    res.status(400).json({ message: 'Missing required text field' });
  else res.status(400).json({ message: 'Missing post data' });
}

module.exports = router;
