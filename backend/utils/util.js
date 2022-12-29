const crypto  = require('crypto')
const jwt = require('jsonwebtoken')
const constant  = require('../utils/constant')
// md5加密
function md5(s) {
  return crypto.createHash('md5')
    .update(String(s)).digest('hex');
}

// 授权jwt
function authToken(username) {
  console.log("根据", username,"获得的token");
  const token = jwt.sign({
    username
  }, constant.TOKEN_KEY, { expiresIn: constant.JWT_EXPIREDTIME });
    return token
}



module.exports={
  md5,authToken
}