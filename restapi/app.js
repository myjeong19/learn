var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
/** 4. 데이터를 분석하는 방법 bodyParser
 * 중요한 점: 들어오는 json 데이터로 작업하고 있다는 것을 기억하자.
 * 우리가 데이터로 josn 데이터를 반환하듯 클라이언트도 포함하는 요청을 통해 우리 API와 통신하게 됨.
 * 모든 요청과 응답에서, json 데이터 형식을 사용하고자 하며, 이는 bodyParser를 설치한 이유임.
 */
const bodyParser = require('body-parser');
var logger = require('morgan');

const feedRouter = require('./routes/feed');

var app = express();

// 5. app.use(bodyParser.urlencoded());
/**  x-www-form-urlencoded 형식 데이터를 담고 있는 데이터 포맷 또는 요청에 대한 좋은 방법
 *  허나 여기선 form 데이터가 필요 없음
 *  대신, json 메서드로 bodtyParser를 사용해, 들어오는 요청으로 부터 json 데이터를 분석하게 됨
 *  이는 application/json에 사용하기 좋은 방식으로, 헤더에서 볼 수 있는 공식 명칭임
 */
app.use(bodyParser.json());
// 6. 이제 들어오는 json 데이터를 파스해서, 본문에서 추출하기 위한 미들웨어가 필요함.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 8 CORS 해결
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accesss-Control-Allow-Origin', 'GET,POST,PUT,PATCH,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type',
    'Authorization'
  );
  next();
});
app.use('/feed', feedRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
