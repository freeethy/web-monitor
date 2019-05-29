const db = require("../config/db");
const Sequelize = db.sequelize;
const BehaviorInfo = Sequelize.import("../schema/behaviorInfo");

BehaviorInfo.sync({ force: false });

class BehaviorInfoModel {
  static async createBehaviorInfo(data) {
    return await BehaviorInfo.create({
      ...data
    });
  }

  static async updateBehaviorInfo(id, data) {
    await BehaviorInfo.update(
      {
        ...data
      },
      {
        where: { id },
        fields: Object.keys(data)
      }
    );

    return true;
  }

  static async getBehaviorInfoList() {
    return await BehaviorInfo.findAndCountAll();
  }

  static async getBehaviorInfoDetail(id) {
    return await BehaviorInfo.findOne({
      where: {
        id
      }
    });
  }

  static async deleteBehaviorInfo(id) {
    await BehaviorInfo.destroy({
      where: {
        id
      }
    });
    return true;
  }

  //   static async deleteBehaviorInfoFifteenDaysAgo(days) {
  //     const timeScope = Utils.addDays(0 - days) + " 00:00:00";
  //     var querySql =
  //       "delete from behaviorInfos where createdAt<'" + timeScope + "'";
  //     return await Sequelize.query(querySql, {
  //       type: Sequelize.QueryTypes.DELETE
  //     });
  //   }

  static async getBehaviorsByUser(
    webMonitorIdSql,
    customerKeySql,
    happenTimeSql
  ) {
    let sql =
      "select * from behaviorInfos where " +
      happenTimeSql +
      " and " +
      customerKeySql +
      " and " +
      webMonitorIdSql;
    return await Sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT });
  }
}

module.exports = BehaviorInfoModel;
