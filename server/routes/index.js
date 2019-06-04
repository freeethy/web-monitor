const router = require("koa-router")();
const statics = require("koa-static");

const log = require("log4js").getLogger("index");

const CommonController = require("../controllers/common");
const BehaviorInfoController = require("../controllers/behaviorInfo");

router.post("/upload", CommonController.uploadLog);

// 行为信息
router.post("/behaviorInfo", BehaviorInfoController.bulkCreate);
router.get("/getBehaviorInfoList", BehaviorInfoController.getBehaviorInfoList);
router.get(
  "/deleteBehaviorInfoDaysAgo",
  BehaviorInfoController.deleteBehaviorInfoDaysAgo
);

router
  //   .use("/api/v1", apiRoutes.routes(), apiRoutes.allowMethods())
  //   .get("*.*", statics(staticDirPath))
  .get("/*", async (ctx, next) => {
    log.debug("This is in the route");
    ctx.type = "html";
    ctx.body = "hello world 1";
    // ctx.body = fs.createReadStream(path.join(staticDirPath, "/index.html"));
    // next();
  });

module.exports = router;
