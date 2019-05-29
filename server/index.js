var log4js = require("log4js");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const http = require("http");
const compress = require("koa-compress");
const json = require("koa-json");

const router = require("./routes");

log4js.configure("./config/log4js.json");
const log = log4js.getLogger("app");

const app = new Koa();
app.use(compress());

const server = http.createServer(app.callback());

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("X-Powered-By", "3.2.1");
  ctx.set("Content-Type", "application/json;charset=utf-8");
  await next();
});

// middlewares
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
    formLimit: "5mb",
    jsonLimit: "5mb",
    textLimit: "5mb"
  })
);

app.use(json());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  let ms = 0;
  try {
    //开始进入到下一个中间件
    await next();
    ms = new Date() - start;
    //记录响应日志
    // log.info(ctx, ms);
  } catch (error) {
    //记录异常日志
    log.error(ctx, error, ms);
  }
});

app.use(router.routes()).use(router.allowedMethods());

app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

server.listen(3000);
