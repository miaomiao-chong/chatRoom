const models = require("../database/models");
const utils = require("../utils/util");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
} = require("../utils/constant");
const { authToken } = require("../utils/util");

var User = models.getModel("users");

// 注册
async function register(ctx, obj) {
  const { user, pwd, type } = obj;
  return new Promise(async (resolve, reject) => {
    let res = await User.findOne({ user: user });
    console.log(res);
    if (res) {
      reject(USER_ALREADY_EXISTS);
      return;
    }
    if (!user || !pwd) {
      reject(NAME_OR_PASSWORD_IS_REQUIRED);
      return;
    }
    const userModal = new User({ user, pwd: utils.md5(pwd), type });
    userModal.save((err, doc) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// 登录
async function login(ctx, obj) {
  const { user, pwd } = obj;
  return new Promise((resolve, reject) => {
    // 是否有该用户
    User.findOne({ user }, (err, doc) => {
      if (!doc) {
        // 用户不存在
        reject(USER_DOES_NOT_EXISTS);
      } else {
        User.findOne({ user, pwd }, (err, doc) => {
          if (doc) {
            resolve(authToken(doc.user));
          } else {
            // 密码错误
            reject(PASSWORD_IS_INCORRENT);
          }
        });
      }
    });
  });
}

// 获取用户信息
async function getInfoByName(ctx, username) {
  return new Promise((resolve, reject) => {
    // 是否有该用户  返回字段去掉密码
    User.findOne({ user: username }, { pwd: 0 }, (err, doc) => {
      if (!doc) {
        // 用户不存在
        reject(USER_DOES_NOT_EXISTS);
      } else {
        resolve(doc);
      }
    });
  });
}
module.exports = {
  register,
  login,
  getInfoByName,
};
