const BehaviorInfoModel = require("../models/behaviorInfo");
const log = require("log4js").getLogger("behavior");

class BehaviorInfoController {
  static async create(ctx) {
    const data = ctx.request.body || {};
    if (data.happenTime) {
      let ret = await BehaviorInfoModel.createBehaviorInfo(data);
      let res = await BehaviorInfoModel.getBehaviorInfoDetail(ret.id);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: "创建行为信息成功"
      };
    } else {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: "创建行为信息失败，请求参数不能为空！"
      };
    }
  }
}

module.exports = BehaviorInfoController;
