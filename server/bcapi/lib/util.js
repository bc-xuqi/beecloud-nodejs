const config = require('./config');
const url = require('url');
const https = require('https');
const request = require('superagent');

/**
 * @desc 验证参数非空，类型
 * @param {obj} data - common中参数为必要，其他的满足条件必要 
 */

function checkData(param, data) {
    try {
        for (var i in data) {
            if (i === 'common') {
                for (var j in data.common) {
                    if (!param[j]) {
                        throw config.NEED_PARAM + j;
                    } else if (data.common[j] === 'array') {
                        if (!param[j] instanceof Array) {
                            throw config.NEED_VALID_PARAM + j;
                        }
                    } else if (!data.common[j] === 'object') {
                        if (!param[j] instanceof Object) {
                            throw config.NEED_VALID_PARAM + j;
                        }
                    } else {
                        if (typeof param[j] !== data.common[j]) {
                            throw config.NEED_VALID_PARAM + j;
                        }
                    }
                }
            } else {
                for (var j in data[i]) {
                    if (param[i] === j) {
                        for (var k in data[i][j]) {
                            if (!param[k]) {
                                throw config.NEED_PARAM + k;
                            } else if (data[i][j][k] === 'array') {
                                if (!param[k] instanceof Array) {
                                    throw config.NEED_VALID_PARAM + k;
                                }
                            } else if (data[i][j][k] === 'object') {
                                if (!param[k] instanceof Object) {
                                    throw config.NEED_VALID_PARAM + k;
                                }
                            } else {
                                if (typeof param[k] !== data[i][j][k]) {
                                    throw config.NEED_VALID_PARAM + k;
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            resultCode: 0
        };
    } catch (error) {
        return {
            resultCode: 10086,
            errMsg: error
        };
    }
}


function _urlencode(obj) {
    if (!(obj instanceof Array) && !(obj instanceof Object)) {
        throw new TypeError('obj 类型错误！');
    }
    if (obj instanceof Array) {
        for (var i = 0, len = obj.length; i < len; i++) {
            if (obj[i] instanceof Object) {
                _urlencode(obj[i]);
            } else {
                obj[i] = typeof obj[i] === 'string' ? encodeURIComponent(obj[i]) : obj[i];
            }
        }
    } else {
        for (var i in obj) {
            if (obj[i] instanceof Array || obj[i] instanceof Object) {
                _urlencode(obj[i]);
            } else {
                obj[i] = typeof obj[i] === 'string' ? encodeURIComponent(obj[i]) : obj[i];
            }
        }
    }
}


function postman(param) {
    return new Promise((resolve, reject) => {
        //参数验证
        const checkResult = checkData(param.data, param.neededData);
        if (checkResult.resultCode != 0) {
            resolve(checkResult);
        }
        const urlStr = 'https://' + config.servers[Math.ceil(Math.random() * 3)] + param.path;
        const resHandler = (res) => {
            resolve(res.text?JSON.parse(res.text):'');
        }
        if (param.type.toLocaleLowerCase() === 'get') {
            request
                .get(`${urlStr}?para=${encodeURIComponent(JSON.stringify(param.data))}`)
                .end((err, res) => {
                    resHandler(res);
                });
        } else if (param.type.toLocaleLowerCase() === 'post') {
            request.post(urlStr)
                .send(param.data)
                .end((err, res) => {
                    resHandler(res);
                })
        } 
    })
}

// function postman(param) {
//     return new Promise((resolve, reject) => {
//         //参数验证
//         const checkResult = checkData(param.data, param.neededData);
//         if (checkResult.resultCode != 0) {
//             resolve(checkResult);
//         }
//         _urlencode(param.data);
//         const urlStr = 'https://' + config.servers[Math.ceil(Math.random() * 3)] + param.path;
//         const resHandler = (res)=>{
//             res.setEncoding("utf-8");
//             let resData = [],
//                 errorMsg;
//             res.on("data", (chunk) => {
//                 resData.push(chunk);
//             }).on("end", () => {
//                 if (res.statusCode === 200) {
//                     resolve(resData.join(''));
//                 }
//             });
//         }
//         if (param.type.toLowerCase() === 'get') {
//             https.get(`${urlStr}?para=${encodeURIComponent(JSON.stringify(param.data))}`, (res) => {
//                resHandler(res);
//             })
//         } else {
//             let parse = url.parse(urlStr),
//             data = JSON.stringify(param.data),
//             options = {
//                 "method": param.type,
//                 "host": parse.hostname,
//                 "path": parse.path,
//                 "port": parse.port,
//                 "headers": {
//                     "Content-Length": data.length,
//                     "Content-Type": "application/json",
//                     "Connection": "keep-alive"
//                 }
//             };
//             let req = https.request(options, (res) => {
//                 resHandler(res);
//             });
//             req.write(data);
//             req.end();
//         }
//     })
// }

exports.postman = postman;