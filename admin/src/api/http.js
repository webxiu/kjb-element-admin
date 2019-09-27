import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';

// Message.error('865')
// console.log(process.env.NODE_ENV);

// 环境的切换
let url;
if (process.env.NODE_ENV == 'development') {
    url = 'http://localhost:8888';
}
else if (process.env.NODE_ENV == 'debug') {
    url = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    url = 'https://www.production.com';
}


const http = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Authorization': localStorage.getItem('token') || 'fkiafjlaj555fa3f1a3'
    },
    withCredentials: true,
    timeout: 2600
})

// 请求
http.interceptors.request.use(config => {
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应
http.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, error => {
    if (error.response.status) {
        switch (error.response.status) {
            case 400:
                err.message = '请求错误'
                break

            case 401:
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                });
                break;

            case 403:
                Message.error('登录过期，请重新登录录')
                // 清除token
                localStorage.removeItem('token');
                store.commit('loginSuccess', null);
                setTimeout(() => {
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                break;
            case 404:
                Message.error('网络请求不存在')
                break;

            case 408:
                Message.error('请求超时')
                break

            case 500:
                Message.error('服务器内部错误')
                break
            case 501:
                Message.error('服务未实现')
                break

            case 502:
                Message.error('网关错误')
                break

            case 503:
                Message.error('服务不可用')
                break

            case 504:
                Message.error('网关超时')
                break

            case 505:
                Message.error('HTTP版本不受支持')
                break

            // 其他错误，直接抛出错误提示
            default:
                Message.error('错误:' + error.response.data.message)
        }
        return Promise.reject(error.response);
    }
});

/**
 * http请求
 * @param {Object} config 
 */
const request = function (config) {
    if (config.hasOwnProperty('version')) {
        config.url = `${config.version}/${config.url}`
    } else {
        config.url = `${process.env.DEFAULT_VERSION}/${config.url}`
    }
    let params = { url: config.url, method: config.method }
    if (config.hasOwnProperty('data')) {
        params.data = delUndefined(config.data)
    }
    if (config.hasOwnProperty('params')) {
        params.params = config.params
    }
    return http(params)
}

function delUndefined(ob) {
    for (let e in ob) {
        if (typeof (ob[e]) === 'undefined' || ob[e] === null) {
            delete ob[e];
        } else if (ob[e].constructor === Object) {
            if (Object.keys(ob[e]).length === 0) {
                delete ob[e];
            } else {
                delUndefined(ob[e]);
            }
        } else if (ob[e].constructor === Array) {
            ob[e].map(function (seg) {
                if (typeof (seg) === 'object') {
                    delUndefined(seg);
                }
            });
        }
    }
    return ob;
}

export default request