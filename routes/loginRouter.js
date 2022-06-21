const express = require('express');

const router = express.Router();

const getToken = require('../middlewares/getToken');

const {
  isEmailValid,
  isPasswordValid,
} = require('../middlewares/loginValidation');

router.post('/', isEmailValid, isPasswordValid, getToken, async (req, res) => {
  const { token } = req.token;

  res.status(200).json({ token });
});

module.exports = router;