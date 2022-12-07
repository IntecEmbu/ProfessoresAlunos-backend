const fs = require('fs')

function createFolder(req, res, next) {
  const {nome} = req.params;
  if (!fs.existsSync(`/${nome}`)) {

    fs.mkdirSync(`./files/${nome}`)
 }

  next();
}

module.exports = {createFolder};