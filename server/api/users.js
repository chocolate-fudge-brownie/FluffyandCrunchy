const router = require('express').Router();
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');
const {
  models: { User },
} = require('../db');

// GET /api/users
// GET all users (admin only)
router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId
// GET single user (admin only)
router.get('/:userId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'username'],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User Not Found');
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:userId
// Update single user (user only)
router.put('/:userId', requireToken, async (req, res, next) => {
  try {
    if (req.user.id === Number(req.params.userId)) {
      const { username, email, password } = req.body; // to protect against injection
      const user = await User.findByPk(req.params.userId);
      if (user) {
        const updatedUser = await user.update({ username, email, password });
        res.json(updatedUser);
      } else {
        res.status(404).send('User Not Found');
      }
    } else {
      res.status(404).send('Not Authorized');
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

module.exports = router;
