const setToken = require('../helpers/setToken');

const getToken = (req, _res, next) => {
  const { email } = req.body;
  const token = setToken(email);

  req.token = { token };
  next();
};

module.exports = getToken;
