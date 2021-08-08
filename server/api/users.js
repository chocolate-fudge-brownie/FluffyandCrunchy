<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const {
  models: { User, Order },
} = require('../db');
const { isAdmin, requireToken } = require('./gatekeepingMiddleware');

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

router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Order });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
=======
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

module.exports = router;
>>>>>>> main
