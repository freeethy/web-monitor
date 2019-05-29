/**
 * 使用axios实例封装的一个Ajax对象
 * - 支持jsonp
 */
import axios from 'axios'
import jsonp from 'jsonp'
import qs from 'qs'
require('promise.prototype.finally').shim()

const Ajax = axios.create({
	//URL根路径
    baseURL: '/'
});

//请求数组 记录请求ID(在拦截器创建)
let reqs={
    obj:{},
    arr:[],
    add:function(id,req){
        this.obj[id] = reqs.arr.length;
        this.arr.push(req);
    },
    remove:function(id){
        this.arr.splice(this.obj[id],1);
        delete this.obj[id];
    },
    reset:function(){
        this.obj={};
        this.arr=[];
    }
};

/**
 * 扩展添加Ajax方法
 * @desc: 在axios拦截器 请求之前在config中添加 ajaxId
 *
 * @param {int} id ajaxId   通常为时间戳
 *
 * @return axios 生成的cancelToken 用于取消该请求
 *
 * @eg: Ajax.removeRequest(id);
 *
 */
Ajax.addRequest = (id)=>{
    let req = axios.CancelToken.source();
    reqs.add(id,req);
    return req.token;
};

/**
 * 扩展根据id取消Ajax方法
 * @desc: 在axios拦截器 请求完成之后移除
 *
 * @param  {int} id     ajaxId 在addRequest
 *
 * @return  无
 *
 * @eg: Ajax.removeRequest(id);
 *
 */

Ajax.removeRequest = (id)=>{
    reqs.remove(id);
};

/**
 * 扩展取消Ajax方法
 *
 * @desc: 解决SPA单页下,router变更后取消当前页面正在进行的ajax
 *         1. 在Router onLeave 方法中 调用
 *         2. 在Container 组件 componentWillUnmount 生命周期中调用
 *
 * @eg: Ajax.cancelAll()
 *
 */
Ajax.cancelAll = ()=>{

    reqs.arr.map((req)=>{
        req.cancel();
    });
    reqs.reset();
};

/**
 * 扩展一个jsonp方法
 * @param  {[type]} url     请求地址（可省略，使用options.url）
 * @param  {Object} options 配置
 * {
 *     jsonp                回调函数参数名 对应?callback=jsonpCallback中的callback
 *     jsonpCallback        回调函数名称 对应?callback=jsonpCallback中的jsonpCallback
 *     ...同axios配置
 * }
 * @return {[type]}         [Promise]
 *
 * @eg. Ajax.jsonp('http://www.example.com/abc',{params:{id:1}})
 */
Ajax.jsonp = axios.prototype.jsonp = (url, options = {}) => {

    //允许省略第一个参数
    if(typeof url !=='string'){
        options = url || {};
        url = options.url
    }

    //options.jsonp不为字符串，则使用默认值
    if(typeof options.jsonp !=='string'){
        options.jsonp = 'stcallback'
    }

    const config = {
        jsonpCallback: `jsonp_${new Date().getTime()}`,
        ...options
    };

    if(typeof config.url === 'undefined'){
    	config.url = url;
    }

    return new Promise((resolve, reject) => {
        jsonp(config.url, {
            param: `${qs.stringify(config.params)}&${config.jsonp}`,
            name: config.jsonpCallback
        }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve({
                    data,
                    status: 200,
                    statusText: 'OK',
                    headers:config.headers,
                    config: options,
                    request: {}
                })
            }
        })
    })
};

Ajax.axios = axios;

export default Ajax
