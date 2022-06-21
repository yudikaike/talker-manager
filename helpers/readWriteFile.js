const fs = require('fs').promises;

const readContentFile = async (PATH) => {
  try {
    const content = await fs.readFile(PATH, 'utf8')
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

module.exports = readContentFile;