const BehaviorInfoModel = require("../models/behaviorInfo");
const log = require("log4js").getLogger("behavior");

class BehaviorInfoController {
  static async create(ctx) {
    const body = ctx.request.body || {};
    const data = JSON.parse(body.logInfo);

    if (data.happenTime) {
      let ret = await BehaviorInfoModel.create(data);
      let res = await BehaviorInfoModel.getDetail(ret.id);

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

  static async bulkCreate(ctx) {
    const body = ctx.request.body || {};
    const data = body.logInfo || "";
    const arr = data.split("$$$");

    if (arr.length) {
      arr.splice(arr.length - 1, 1);
      const newArr = arr.map(v => {
        return JSON.parse(v);
      });
      let ret = await BehaviorInfoModel.bulkCreate(newArr);
      log.info("批量创建行为信息成功");

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: "批量创建行为信息成功"
      };
    } else {
      log.error("批量创建行为信息失败，请求参数不能为空！");
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: "批量创建行为信息失败，请求参数不能为空！"
      };
    }
  }

  static async getBehaviorInfoList(ctx) {
    let req = ctx.request.body;
    if (req) {
      const data = await BehaviorInfoModel.getList();

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
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

  static async deleteBehaviorInfoDaysAgo(ctx) {
    let req = ctx.request.query;
    if (req && req.days) {
      const data = await BehaviorInfoModel.deleteDaysAgo(req.days);

      ctx.response.status = 200;
      ctx.body = {
        code: 200,
        msg: "删除行为信息列表成功！",
        data
      };
    } else {
      ctx.response.status = 412;
      ctx.body = {
        code: 412,
        msg: "删除行为信息列表失败！"
      };
    }
  }
}

module.exports = BehaviorInfoController;
