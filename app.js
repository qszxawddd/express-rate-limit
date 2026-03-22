var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// 一秒最多一個請求 並導向 busy.html
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 1, // limit each IP to 1 requests per windowMs
    statusCode: 503,          // 回應狀態碼改為503服務不可用
    message: "伺服器繁忙，請稍後再試。",
    handler: (req, res) => {
        // 超出限制時回傳靜態頁面
        res.sendFile(path.join(__dirname, 'public', 'busy.html'));
    }
});
app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
