const PATH = "mongodb://localhost:27017/recruiment-datas";

// 有关密钥
const TOKEN_KEY = "kxxwz_tokenkey";
const JWT_EXPIREDTIME = 60 * 60;
const SALT_KEY = "kxxwz_saltkey";

// 有关报错
const NAME_OR_PASSWORD_IS_REQUIRED = "name_or_password_is_required";
const USER_ALREADY_EXISTS = "user_already_exists";
const USER_DOES_NOT_EXISTS = "user_does_not_exists";
const PASSWORD_IS_INCORRENT = "password_is_incorrent";
const UNAUTHORIZATION = "UNAUTHORIZATION";  // token过期

// 错误码
SUCCESS_CODE = 2000;
ERR_CODE = -1;

module.exports = {
  PATH,
  TOKEN_KEY,
  JWT_EXPIREDTIME,
  SALT_KEY,
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UNAUTHORIZATION,
  SUCCESS_CODE,
  ERR_CODE,
};
