const fs = require('fs');
module.exports = (req, res, next) => {
  const date = new Date();
  const filename = `${date.getFullYear()}.${date.getMonth()}-${date.getDate()}.log`;
  const logline = `${req.method} -- ${req.path} -- ${date} \n`;

  fs.appendFile(`./logs/${filename}`, logline);
  return next();
};