const express = require('express');

const router = express.Router();

const {
  readContentFile,
  writeContentFile,
} = require('../helpers/readWriteFile');

const isTokenValid = require('../middlewares/tokenValidation');

const {
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
} = require('../middlewares/talkerValidation');

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];

  const talker = talkers.find((tal) => tal.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talker);
});

router.post('/',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
  async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await readContentFile(PATH_FILE) || [];

  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };

  await writeContentFile(PATH_FILE, newTalker);

  res.status(201).json(newTalker);
});

module.exports = router;
