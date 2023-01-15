const models = require("../database/models");
const utils = require("../utils/util");
let Chat = models.getModel("chat");
let User = models.getModel("users");
async function readmsg(ctx, from) {
  return new Promise((resolve, reject) => {
    Chat.updateMany(
      { from, to: ctx.username },
      { $set: { read: true } },
      (err, doc) => {
        if (!err) {
          resolve(doc.modifiedCount);
          return;
        }
        reject(err.message);
      }
    );
  });
}
async function getMessageList(ctx) {
  return new Promise((resolve, reject) => {
    User.find({}, (err, userdoc) => {
      let users = {};
      userdoc.forEach((v) => {
        users[v._id] = {
          name: v.user,
          avatar: v.avatar,
        };
      });
      // 找到和当前用户有关的消息
      Chat.find(
        { $or: [{ from: ctx.username }, { to: ctx.username }] },
        (err, doc) => {
          if (!err) {
            resolve(doc);
            return;
          }
          reject(err.message);
        }
      );
    });
  });
}
module.exports = {
  readmsg,
  getMessageList,
};
