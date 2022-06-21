const CryptoJS = require('crypto-js');

const setToken = (message) => CryptoJS.AES.encrypt(message, 'talker')
  .toString().substring(0, 16);

module.exports = setToken;