let Router = require("koa-router");
let router = new Router({ prefix: "/users" });

const {
  register,
  login,
  getInfoByName,
  update,
  getlist,
} = require("../service/user");
const { SUCCESS_CODE } = require("../utils/constant");
const verifyAuth = require("../middleware/auth");

router.post("/register", async (ctx, next) => {
  // 注册： 用户名密码为空或用户名已存在报错;
  await register(ctx, ctx.request.body)
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "注册成功",
      };
    })
    .catch((err) => {
      ctx.app.emit("error", new Error(err), ctx);
    });
});

router.post("/login", async (ctx, next) => {
  //登录  是否有改用户， 有该用户密码是否正确， 登录成功返回token
  await login(ctx, ctx.request.body)
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "登录成功",
        data: {
          token: res,
        },
      };
    })
    .catch((err) => {
      ctx.app.emit("error", new Error(err), ctx);
    });
});
module.exports = router;

// 获取用户信息
router.get("/info", verifyAuth, async (ctx, next) => {
  // 在verifyAuth中间件已经解好码了
  await getInfoByName(ctx, ctx.username)
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "获取用户成功",
        data: res,
      };
    })
    .catch((err) => {
      // ctx.app.emit("error", new Error(err), ctx);
      console.log("err---", err.message);
      ctx.app.emit("error", new Error("服务端错误"), ctx);
    });
});

// 更新用户信息
router.post("/update", verifyAuth, async (ctx, next) => {
  let body = ctx.request.body;
  await update(ctx, body)
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "更新成功",
        data: res,
      };
    })
    .catch((err) => {
      console.log(err);
      ctx.app.emit("error", new Error("服务端错误"), ctx);
    });
});

// 获取用户列表
router.get("/list", verifyAuth, async (ctx, next) => {
  const { type } = ctx.query;
  await getlist(type)
    .then((res) => {
      ctx.response.body = {
        code: SUCCESS_CODE,
        message: "获取成功",
        data: res,
      };
    })
    .catch((err) => {
      console.log(err);
      ctx.app.emit("error", new Error("服务端错误"), ctx);
    });
});
module.exports = router;
