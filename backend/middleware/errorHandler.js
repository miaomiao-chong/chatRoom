const constant = require("../utils/constant");
const { ERR_CODE } = require("../utils/constant");

const errorHandler = (error, ctx) => {
  let status, message;
  console.log("error111", error);
  switch (error.message) {
    case constant.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400; // Bad Request
      message = "用户名或者密码不能为空~";
      break;
    case constant.USER_ALREADY_EXISTS:
      status = 409; // conflict
      message = "用户名已经存在~";
      break;
    case constant.USER_DOES_NOT_EXISTS:
      status = 400; // 参数错误
      message = "用户不存在~";
      break;
    case constant.PASSWORD_IS_INCORRENT:
      status = 400; // 参数错误
      message = "密码错误~";
      break;
    case constant.UNAUTHORIZATION:
      status = 401; // 参数错误
      message = "无效的token~";
      break;
    default:
      status = 404;
      message = error.message;
  }
  ctx.status = status || 400;

  ctx.body = {
    code: ERR_CODE,
    message: message || "出现了一些错误",
  };
  return;
};

module.exports = errorHandler;
