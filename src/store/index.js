//判断环境，选用不同的store配置
//- 仅在开发环境使用redux调试工具，其他一样
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./store.prod')
} else {
    module.exports = require('./store.dev')
}



