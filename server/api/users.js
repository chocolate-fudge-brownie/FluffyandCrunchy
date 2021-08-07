// Import modules
const express = require('express');

// Import gatekeeping middlewares
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');

// Import models
const {
  models: { User, Order },
} = require('../db');

// Create sub-router mounted on /api/users
const router = express.Router();

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

module.exports = router;
