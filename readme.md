# readme

## env

使用 [envdot](https://github.com/motdotla/dotenv) 管理环境相关变量，.env 文件中的变量值在代码中可通过 process.env 获取，
[优先级](https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use)如下：

- .env.dev.local > .env.local > .env.dev > .env
- .env.test.local > .env.local > .env.test > .env
- .env.prod.local > .env.local > .env.prod > .env

## 运行

> npm 使用的内部源，均可改为使用 taobao 源，源导致报错的可以删除报错相关的包，暂未处理。

    需要安装 mysql 数据库

    >  启动服务器
        cd server
        yarn start (或使用pm2启动 yarn pm2-pod)
        访问 http://localhost:3000/getBehaviorInfoList 获取收集到的行为打点信息
    > 启动客户页面
        yarn start:lib
        访问 http://localhost:3005 点击页面任意地方，提交行为打点信息

# 参考

- [监控](https://github.com/a597873885/webfunny_servers)
- [sequelizejs](http://docs.sequelizejs.com/manual/getting-started.html)
- [koa-router](https://www.npmjs.com/package/koa-router#exp_module_koa-router--Router)
