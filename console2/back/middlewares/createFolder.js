const fs = require('fs');
const { connect } = require('http2');
const { ConnectionAcquireTimeoutError } = require('sequelize');

function createFolder(req, res, next) {
  const {nome} = req.params;
  try{
  fs.mkdirSync(`./files/${nome}`)}
  catch{
    next();
  }

}

module.exports = {createFolder};

// const fs = require('fs')

// function createFolder(req, res, next) {
//   const {nome} = req.params;
//   if (!fs.existsSync(`/${nome}`)) {

//     fs.mkdirSync(`./files/${nome}`)
//  }

//   next();
// }

// module.exports = {createFolder};

