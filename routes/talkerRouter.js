const express = require('express');
const router = express.Router()

const readContentFile = require('../helpers/readWriteFile')

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readContentFile(PATH_FILE) || [];

  const talker = talkers.find((talker) => talker.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada'});

  res.status(200).json(talker);
});

module.exports = router;
