const express = require('express');
const server = express();

const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());

const logger = (req, res, next) => {
  console.log(`${req.method} request made to ${req.url} at ${Date.now()}`);
  next();
};

const protected = (req, res, next) => {
  const password = req.headers.password;
  if (password && password.toLowerCase() === 'austen') next();
  else res.status(401).json({ message: 'Invalid pass' });
};

server.use(logger);

server.get('/', (req, res) => {
  res.status(200).json('nice');
});

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

const port = process.env.PORT || 8000;
server.listen(port, () =>
  console.log('\x1b[1m\x1b[32m', `*** listening on port ${port} ***`, '\x1b[0m')
);
