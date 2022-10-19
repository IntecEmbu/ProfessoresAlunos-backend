import jwt from 'jsonwebtoken';

function generateToken(sign, userName) {
 return jwt.sign({infoUser: {sign, userName: userName}}, secret, {expiresIn: 60 * 60 * 5});
}
export { generateToken};