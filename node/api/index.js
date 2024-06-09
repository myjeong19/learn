//* 서버 측 통신을 처리하는 모듈
const http = require('http');

//* 서버가 필요한 이유
//* 서버는 요청을 처리하고 사용자와 애플리케이션 간의 응답을 제공하는 게이트웨이 역할을 한다.
const server = http.createServer((req, res) => {
  //   res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end('Hello, This is a NodeJs HTTP Server');
  //   res.writeHead(200, { 'Content-Type': 'text/html' });
  //   res.end("Hello, This is a NodeJs HTTP Server <p style='color: green'>200 ok</p>");
});

server.listen(3000, () => {
  console.log('Server is up and running on port 3000');
});

// * localhost에서 서버를 실행할 때, 기본적으로 자신의 컴퓨터에서 서버를 실행하게된다.
