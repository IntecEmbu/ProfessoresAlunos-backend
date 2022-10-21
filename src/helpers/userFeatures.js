import jwt from "jsonwebtoken";

function generateToken(id_login, nome) {
  var secret = "1234";
  return jwt.sign({ infoUser: { id_login, userName: nome } }, secret, {
    expiresIn: 60 * 60 * 5,
  });
}
export { generateToken };
