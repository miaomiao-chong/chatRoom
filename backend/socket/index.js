const models = require("../database/models");
let Chat = models.getModel("chat");
module.exports = function socket(io) {
  io.sockets.on("connection", function (socket) {
    // 发送信息
    console.log(socket);
    socket.on("sendmsg", (data) => {
      const { from, to, msg } = data;
      const chatid = [from, to].sort().join("_");
      if (to) {
        Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
          //console.log(Object.assign({}, doc._doc))
          io.emit("receivemsg", Object.assign({}, doc._doc));
        });
      }
    });
  });
};
