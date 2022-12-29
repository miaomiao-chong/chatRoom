const mongoose = require("mongoose");

const models = {
  users: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    //头像
    avatar: String,
    //个人简介或者职位简介
    desc: String,
    //职位名称
    title: String,
    company: String,
    money: String,
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: "" },
    create_time: { type: Number, default: Date.now },
  },
};
for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
  // console.log(mongoose.model(m));
}

function getModel(name) {
  // console.dir(mongoose.model(name));
  return mongoose.model(name);
}
module.exports = {
  getModel,
};
