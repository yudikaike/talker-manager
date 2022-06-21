const express = require('express');

const router = express.Router();

const {
  readContentFile,
  writeContentFile,
  updateContentFile,
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

  const talker = talkers.find((t) => t.id === Number(id));

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

router.put('/:id',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkValid,
  isWatchedAtValid,
  isRateValid,
  async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const talkers = await readContentFile(PATH_FILE) || [];
  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));

  talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk: { watchedAt, rate } };

  await updateContentFile(PATH_FILE, talkers);

  res.status(200).json(talkers[talkerIndex]);
});

router.delete('/:id', isTokenValid, async (req, res) => {
  const { id } = req.params;

  const talkers = await readContentFile(PATH_FILE) || [];

  const talkerIndex = talkers.findIndex((t) => t.id === Number(id));

  talkers.splice(talkerIndex, 1);

  await updateContentFile(PATH_FILE, talkers);

  res.status(204).end();
});

module.exports = router;
