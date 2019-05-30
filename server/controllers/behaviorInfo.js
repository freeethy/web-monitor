const BehaviorInfoModel = require("../models/behaviorInfo");
const log = require("log4js").getLogger("behavior");

class BehaviorInfoController {
  static async create(ctx) {
    const body = ctx.request.body || {};
    const data = JSON.parse(body.logInfo);

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

  static async getBehaviorInfoList(ctx) {
    let req = ctx.request.body;
    if (req) {
      const data = await BehaviorInfoModel.getBehaviorInfoList();

      ctx.response.status = 200;
      ctx.body = {
        code: 412,
        msg: "查询行为信息列表成功！",
        data
      };
    } else {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: "查询行为信息列表失败！"
      };
    }
  }
}

module.exports = BehaviorInfoController;
