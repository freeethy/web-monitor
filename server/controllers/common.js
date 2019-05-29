const log = require("log4js").getLogger("common");

class Common {
  static async uploadLog(ctx) {
    log.info(ctx);
    ctx.response.status = 200;
    ctx.body = {
      code: 200,
      msg: "success"
    };
  }
}

module.exports = Common;
