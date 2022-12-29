const constant = require("../utils/constant");
const jwt = require("jsonwebtoken");
const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  console.log("authorization", authorization);
  if (!authorization) {
    const error = new Error(constant.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  console.log("gettoken", token);
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, constant.TOKEN_KEY);
    // 把username放ctx全局使用
    ctx.username = result.username;
    console.log("jwt verify", result);
    await next();
  } catch (err) {
    const error = new Error(err.message);
    return ctx.app.emit("error", error, ctx);
  }
};
module.exports = verifyAuth;
