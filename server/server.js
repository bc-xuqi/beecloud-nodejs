const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const BCRESTApi = require('./lib/BCRESTApi');
const md5 = require('./lib/lib/md5');



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/', express.static(__dirname + '/public'));

const API = new BCRESTApi();


const port = 3002;
app.listen(port, function (error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})


//允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});


app.post('/api/bill', (req, res, next) => { //支付
  API.bill(req.body).then((response) => {
    res.send(response);
  })
})

app.post('/api/bills', (req, res, next) => { //订单查询
  let data = req.body;
  data.app_sign = md5(data.app_id + data.timestamp + data.app_secret);
  API.getBills(data).then((response) => {
    res.send(response);
  })
})

app.post('/api/billsCount', (req, res, next) => { //订单总数
  let data = req.body;
  data.app_sign = md5(data.app_id + data.timestamp + data.app_secret);
  API.getBillsCount(data).then((response) => {
    res.send(response);
  })
})

app.post('/api/refunds', (req, res, next) => { //退款查询
   let data = req.body;
  data.app_sign = md5(data.app_id + data.timestamp + data.app_secret);
  API.getRefunds(data).then((response) => {
    res.send(response);
  })
})

app.post('/api/refundsCount', (req, res, next) => { //退款总数
  let data = req.body;
  data.app_sign = md5(data.app_id + data.timestamp + data.app_secret);
  API.getRefundsCount(data).then((response) => {
    res.send(response);
  })
})

app.post('/api/refund', (req, res, next) => { //退款||预退款
  API.getBills(req.body).then((response) => {
    res.send(response);
  })
})

app.post('/api/queryById', (req, res, next) => { //支付/退款订单查询(指定ID)
  let data = req.body;
  data.app_sign = md5(data.app_id + data.timestamp + data.app_secret);
  if (data.type === 'bill') {
    API.getBillById(data).then((response) => {
      res.send(response);
    })
  } else if (data.type === 'refund') {
    API.getRefundById(data).then((response) => {
      res.send(response);
    })
  }
})

app.post('/api/auth',(req,res,next) => {//鉴权
  API.auth(getData(req.body)).then((response) => {
    res.send(response);
  })
})

app.post('/api/checkoff',(req,res,next) => {//代扣
  API.checkoff(getData(req.body)).then((response) => {
    res.send(response);
  })
})


function getData(data){
  data.app_sign = md5(data.app_id + data.timestamp + data.app_secret);
  return data;
}