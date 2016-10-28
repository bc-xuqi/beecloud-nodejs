const config = require('./lib/config');
const util = require('./lib/util');

class BCRESTApi {
    //支付
    bill(param) {
        return new Promise((resolve, reject) => {
            const neededParam = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    channel: 'string',
                    total_fee: 'number',
                    bill_no: 'string',
                    title: 'string',
                },
                channel: {
                    WX_JSAPI: {
                        openid: 'string'
                    },
                    ALI_WEB: {
                        show_url: 'string',
                        return_url: 'string'
                    },
                    ALI_WAP: {
                        use_app: 'boolean'
                    },
                    ALI_QRCODE: {
                        qr_pay_mode: 'string',
                        return_url: 'string'
                    },
                    YEE_WAP: {
                        identity_id: 'string'
                    },
                    YEE_NOBANKCARD: {
                        cardno: 'string',
                        cardpwd: 'string',
                        frqid: 'string'
                    },
                    UN_WEB: {
                        return_url: 'string'
                    },
                    UN_WAP: {
                        return_url: 'string'
                    },
                    JD_WEB: {
                        return_url: 'string'
                    },
                    JD_WAP: {
                        return_url: 'string'
                    }
                }
            }
            util.postman({
                path: config.URI_BILL,
                type: 'post',
                data: param,
                neededData: neededParam
            }).then((res) => {
                resolve(res);
            })
        })
    }


    //退款
    refund(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    refund_no: 'string',
                }
            }
            util.postman({
                path: config.URI_REFUND,
                type: 'post',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    //预退款批量审核
    refunds(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    channel: 'string',
                    ids: 'array',
                    agree: 'boolean'
                }
            }
            util.postman({
                path: config.URI_REFUND,
                type: 'put',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    //订单查询
    getBills(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                }
            }
            util.postman({
                path: config.URI_BILLS,
                type: 'GET',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    //订单总数查询
    getBillsCount(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                }
            }
            util.postman({
                path: config.URI_BILLS_COUNT,
                type: 'get',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }


    //退款查询
    getRefunds(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                }
            }
            util.postman({
                path: config.URI_REFUNDS,
                type: 'get',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }


    //退款总数查询
    getRefundsCount(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                }
            }
            util.postman({
                path: config.URI_REFUNDS_COUNT,
                type: 'get',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    //退款状态更新
    getRefundStatus(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    channel: 'string',
                    refund_no: 'string'
                }
            }
            util.postman({
                path: config.URI_REFUND_STATUS,
                type: 'get',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    //退款订单查询
    getRefundById(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    id: 'string'
                }
            }
            util.postman({
                path: config.URI_REFUND + '/' + param.id,
                type: 'get',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    //支付订单查询
    getBillById(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    id: 'string'
                }
            }
            util.postman({
                path: config.URI_BILL + '/' + param.id,
                type: 'get',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }


    //鉴权
    auth(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    name: 'string',
                    id_no:'string'
                }
            }
            util.postman({
                path: config.URI_AUTH,
                type: 'post',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }


    /**
     * @desc: 发送短信
     *
     * @param $data
     *   phone 手机号
     *
     * @return json
     */
    sms(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    phone: 'string',
                }
            }
            util.postman({
                path: config.URI_SUBSCRIPTION_SMS,
                type: 'post',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }

    /**
     * @desc: 签约API
     *
     * @param $data
     *   mobile 手机号
     *   bank  银行名称
     *   id_no 身份证号
     *   name   姓名
     *   card_no 银行卡号(借记卡,不支持信用卡)
     *   sms_id  获取验证码接口返回验证码记录的唯一标识
     *   sms_code 手机端接收到验证码
     *
     * @return json
     */
    sign(param) {
        return new Promise((resolve, reject) => {
            const neededData = {
                common: {
                    app_id: 'string',
                    timestamp: 'number',
                    app_sign: 'string',
                    mobile: 'string',
                    bank:'string',
                    id_no:'string',
                    name:'string',
                    card_no:'string',
                    sms_id:'string',
                    sms_code:'string'
                }
            }
            util.postman({
                path: config.URI_CARD_CHARGE_SIGN,
                type: 'post',
                data: param,
                neededData: neededData
            }).then(value => {
                resolve(value);
            })
        })
    }


}

module.exports = BCRESTApi;
