# readme

## env

使用 [envdot](https://github.com/motdotla/dotenv) 管理环境相关变量，.env 文件中的变量值在代码中可通过 process.env 获取，
[优先级](https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use)如下：

- .env.dev.local > .env.local > .env.dev > .env
- .env.test.local > .env.local > .env.test > .env
- .env.prod.local > .env.local > .env.prod > .env

# 参考

- [监控](https://github.com/a597873885/webfunny_servers)
- [sequelizejs](http://docs.sequelizejs.com/manual/getting-started.html)
- [koa-router](https://www.npmjs.com/package/koa-router#exp_module_koa-router--Router)
