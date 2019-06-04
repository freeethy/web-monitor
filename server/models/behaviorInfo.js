const db = require("../config/db");
const Sequelize = db.sequelize;
const BehaviorInfo = Sequelize.import("../schema/behaviorInfo");
const Utils = require("../util/utils.js");

BehaviorInfo.sync({ force: false });

class BehaviorInfoModel {
  static async create(data) {
    return await BehaviorInfo.create({
      ...data
    });
  }

  static async bulkCreate(data) {
    return await BehaviorInfo.bulkCreate([...data], {
      ignoreDuplicates: true
    });
  }

  static async update(id, data) {
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

  static async getList() {
    return await BehaviorInfo.findAndCountAll();
  }

  static async getDetail(id) {
    return await BehaviorInfo.findOne({
      where: {
        id
      }
    });
  }

  static async delete(id) {
    await BehaviorInfo.destroy({
      where: {
        id
      }
    });
    return true;
  }

  static async deleteDaysAgo(days) {
    const timeScope = Utils.addDays(0 - days) + " 00:00:00";
    var querySql =
      "delete from behaviorInfos where createdAt<'" + timeScope + "'";
    return await Sequelize.query(querySql, {
      type: Sequelize.QueryTypes.DELETE
    });
  }

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
