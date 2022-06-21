const express = require('express');

const router = express.Router();

const setToken = require('../helpers/setToken');

router.post('/', async (req, res) => {
  const { email } = req.body;
  const token = setToken(email);

  res.status(200).json({ token });
});

module.exports = router;