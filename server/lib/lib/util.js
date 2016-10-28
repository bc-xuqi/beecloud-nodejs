const config = require('./config');
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


function postman(param) {
    return new Promise((resolve, reject) => {
        //参数验证
        const checkResult = checkData(param.data, param.neededData);
        if (checkResult.resultCode != 0) {
            resolve(checkResult);
        }

        const urlStr = 'https://' + config.servers[Math.ceil(Math.random() * 3)] + param.path;
        const resHandler = (res) => {
            const resData = JSON.parse(res.text);
            resolve(resData)
        }
        if (param.type.toLocaleLowerCase() === 'get') {
            request
                .get(urlStr)
                .query(param.data)
                .end((err, res) => {
                    resHandler(res);
                });
        } else if (param.type.toLocaleLowerCase() === 'post') {
            request.post(urlStr)
                .send(param.data)
                .end((err, res) => {
                    resHandler(res);
                })
        } else {
            alert('请输入请求类型');
        }

    })
}


exports.postman = postman;