export const  APP_ID = 'e66e760b-0f78-44bb-a9ae-b22729d51678';
export const APP_SECRET = '6fb7db77-96ed-46ef-ae10-1118ee564dd3';
//test_secret for sandbox
export const TEST_SECRET = 'a1900cf2-2570-49a3-bfb8-c6e7a1bc1e21';
export const MASTER_SECRET = '97ca13e4-6f40-4790-9734-ddcdc1da21db';


//接口地址
export const BACK_END_HOST = 'http://localhost:3002/';
export const interfaceUrls = {
    bill:BACK_END_HOST+'api/bill',//支付
    bills:BACK_END_HOST+'api/bills',//订单查询
    billsCount:BACK_END_HOST+'api/billsCount',//订单总数
    refunds:BACK_END_HOST+'api/refunds',//退款查询
    refundsCount:BACK_END_HOST+'api/refundsCount',//退款总数
    refund:BACK_END_HOST+'api/refund',//退款/预退款
    queryById:BACK_END_HOST+'api/queryById',//支付/退款订单查询(指定ID)
    auth:BACK_END_HOST+'api/auth',
    checkoff:BACK_END_HOST+'api/checkoff'
}