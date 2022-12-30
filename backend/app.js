const Koa = require("koa");
const Router = require("koa-router");
const cors = require("koa2-cors");
const { koaBody } = require("koa-body");

const app = new Koa();
const router = new Router();
// const serve = require("koa-static");

// 有关socket
const socket = require("./socket");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app.callback());
const io = new Server(httpServer);
socket(io);

require("./database/index");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(
  koaBody({
    multipart: true,
  })
);

const user = require("./router/user");
const chat = require("./router/chat");

app.use(async (ctx, next) => {
  console.log("全局中间件");
  await next();
});

app.use(user.routes());
// app.use(test.routes());

app.use(router.routes());
app.use(router.allowedMethods());

app.on("error", errorHandler);
// 服务开启在3020端口
httpServer.listen(3020, () => {
  console.log("服务开启成功");
});
