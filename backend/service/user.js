const models = require("../database/models");
const utils = require("../utils/util");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_ALREADY_EXISTS,
  USER_DOES_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
} = require("../utils/constant");
const { authToken } = require("../utils/util");

let User = models.getModel("users");

// 注册
async function register(ctx, obj) {
  const { user, pwd, type } = obj;
  return new Promise(async (resolve, reject) => {
    let res = await User.findOne({ user: user });
    if (res) {
      reject(USER_ALREADY_EXISTS);
      return;
    }
    // 这里用mongoose自带的验证了
    // if (!user || !pwd) {
    //   reject(NAME_OR_PASSWORD_IS_REQUIRED);
    //   return;
    // }
    const userModal = new User({ user, pwd: pwd ? utils.md5(pwd) : "", type });
    userModal.save((err, doc) => {
      if (err) {
        const error = err.errors;
        for (let attr in error) {
          reject(error[attr]["message"]);
          return;
        }
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

async function update(ctx, obj) {
  return new Promise((resolve, reject) => {
    // 如果想更新单独一条文档并且返回给应用层，可以使用 findOneAndUpdate 方法。
    // 需要获取数据就用findOneAndUpdate()，只需要修改数据而不关注修改后数据那就用update()。
    User.findOneAndUpdate(
      { user: ctx.username },
      obj,
      // 返回最新的doc
      {
        fields: { pwd: 0, __v: 0, _id: 0 },
        new: true,
      },
      (err, doc) => {
        if (err) {
          reject(err.message);
          return;
        }
        resolve(doc);
      }
    );
  });
}

// 获取用户列表
async function getlist(ctx, type) {
  return new Promise((resolve, reject) => {
    User.find({ type }, (err, doc) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(doc);
    });
  });
}
module.exports = {
  register,
  login,
  getInfoByName,
  update,
  getlist,
};
