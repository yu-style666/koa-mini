const http = require("http");

// 递归处理中间件（middlewares），形成洋葱模型
const compose = (middlewares) => {
  return (ctx) => {
    const dispatch = (i) => {
      const middleware = middlewares[i];

      if (i >= middlewares.length) {
        return;
      }

      return middleware(ctx, () => dispatch(i + 1));
    };

    return dispatch(0);
  };
};

// 构造一个 Context 的类
class Context {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
}

class Application {
  constructor() {
    this.middlewares = [];
  }

  use = (middleware) => {
    this.middlewares.push(middleware);
  };

  listen = (...args) => {
    const server = http.createServer(this.callback);

    server.listen(...args);
  };

  callback = async (req, res) => {
    const ctx = new Context(req, res);

    // 异常处理
    try {
      await compose(this.middlewares)(ctx);
    } catch (e) {
      console.error(e);
      res.statusCode = 500;
      res.end("Internel Server Error");
    }

    res.end(ctx.body);
  };
}

module.exports = Application;
