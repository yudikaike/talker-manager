const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  // https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/
  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
};

module.exports = {
  isEmailValid,
  isPasswordValid,
};