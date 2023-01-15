let Router = require("koa-router");
let router = new Router({ prefix: "/chat" });

const { SUCCESS_CODE } = require("../utils/constant");
const { readmsg, getMessageList } = require("../service/chat");

router.post("/readmsg", async (ctx, next) => {
  console.log("进入");
  const { from } = ctx.request.body;
  await readmsg(from)
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "获取成功",
        data: res,
      };
    })
    .catch((err) => {
      ctx.app.emit("error", new Error(err), ctx);
    });
});

//查询聊天信息接口
router.get("/getmsglist", async (ctx, next) => {
  await getMessageList()
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "查询成功",
        data: res,
      };
    })
    .catch((err) => {
      ctx.app.emit("error", new Error(err), ctx);
    });
});
module.exports = router;
