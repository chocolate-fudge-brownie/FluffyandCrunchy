const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

// POST /auth/login
// Verify user & return token when user log in
router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

// POST /auth/signup
// Add new user & return token when user sign up
router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body; // to protect against injection
    const user = await User.create({ username, email, password });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

// GET /auth/me
// Auto log in user if already logged in
router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
