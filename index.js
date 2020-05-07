const Application = require("./application");

const app = new Application();
const port = 5105;

app.use(async (ctx, next) => {
  console.log("middleware start 1");
  await next();
  console.log("middleware end 1");
});

app.use(async (ctx, next) => {
  console.log("middleware start 2");
  await next();
  console.log("middleware end 2");
});

app.use(async (ctx, next) => {
  console.log("middleware start 3");
  await next();
  console.log("middleware end 3");

  ctx.body = "hi koa-mini!";
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    // 1. 异常结构化
    // 2. 异常分类
    // 3. 异常级别
    // 4. 异常上报
  }
});

app.listen(port, () => {
  console.log("访问地址为: http://localhost:%s", port);
});
