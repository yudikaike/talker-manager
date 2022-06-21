const express = require('express');
const router = express.Router()

const readContentFile = require('../helpers/readWriteFile')

const PATH_FILE = './talker.json';

router.get('/', async (_req, res) => {
  const talkers = await readContentFile(PATH_FILE) || [];

  res.status(200).json(talkers);
})

module.exports = router;
