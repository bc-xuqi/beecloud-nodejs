const config = require('./config');
const url = require('url');
const https = require('https');







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


function postman(param) {
    return new Promise((resolve, reject) => {
        //参数验证
        const checkResult = checkData(param.data, param.neededData);
        if (checkResult.resultCode != 0) {
            resolve(checkResult);
        }
        const urlStr = 'https://' + config.servers[Math.ceil(Math.random() * 3)] + param.path;
        const resHandler = (res)=>{
            res.setEncoding("utf-8");
            let resData = [],
                errorMsg;
            res.on("data", (chunk) => {
                resData.push(chunk);
            }).on("end", () => {
                if (res.statusCode === 200) {
                    resolve(resData.join(''));
                }
            });
        }
        if (param.type.toLowerCase() === 'get') {
            https.get(`${urlStr}?para=${encodeURIComponent(JSON.stringify(param.data))}`, (res) => {
               resHandler(res);
            })
        } else {
            const parse = url.parse(urlStr),
            data = JSON.stringify(param.data),
            options = {
                "method": param.type,
                "host": parse.hostname,
                "path": parse.path,
                "port": parse.port,
                "headers": {
                    "Content-Length": data.length,
                    "Content-Type": "application/json",
                    "Connection": "keep-alive"
                }
            };
            let req = https.request(options, (res) => {
                resHandler(res);
            });
            req.write(data);
            req.end();
        }
    })
}


exports.postman = postman;