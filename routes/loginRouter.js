const express = require('express');

const router = express.Router();

const setToken = require('../helpers/setToken');

const {
  isEmailValid,
  isPasswordValid,
} = require('../middlewares/validation');

router.post('/', isEmailValid, isPasswordValid, async (req, res) => {
  const { email } = req.body;
  const token = setToken(email);

  res.status(200).json({ token });
});

module.exports = router;