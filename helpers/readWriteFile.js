const fs = require('fs').promises;

const readContentFile = async (path) => {
  try {
    const content = await fs.readFile(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

const writeContentFile = async (path, content) => {
  try {
    const redContent = await readContentFile(path);
    redContent.push(content);

    await fs.writeFile(path, JSON.stringify(redContent));

    return content;
  } catch (error) {
    return null;
  }
};

module.exports = {
  readContentFile,
  writeContentFile,
};