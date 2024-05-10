# 웹팩 (Webpack)

## ES 모듈의 단점과 웹팩의 필요성

- HTTP 요청이 많아진다.
  - 모든 HTTP 요청은 처리하는 데 어느정도 시간이 소요된다.
  - 파일이 작은 경우, 우려할 정도는 아니지만, 모든 HTTP 요청에는 기본 오버헤드, 기본 지속 시간이 존재해,
    서버 작업에서 파일을 준비하는 데 시간이 소요된다.
  - 웹팩을 사용하면 위 문제를 해결할 수 있다.

## 웹팩

- 웹팩은 파일을 다 같이 번들링하는 도구이다.

  - 빌드 오케스트레이션(Build orchestration) 도구라 할 수 있다.
  - 코드 번들링으로 여러 개 파일로 코드를 분할 해, HTTP 요청을 줄일 수 있게 해준다.
  - 웹 팩은 코드를 최적화해서, 빌드 단계, 빌드 도구를 더 추가할 수 있게 도와준다.

- 웹팩을 사용하지 않는 일반 설정

  - `import`를 사용하면, HTTP 요청이 여러개로 늘어나는 단점이 있으며, 코드 최적화(Optimized code)가 이루어지지 않았을 가능성이 큰데,  
    이때 웹팩이 코드 번들링으로 `import`를 줄여줄 수 있다.

- tsconfig 설정

  - "target": ES5 or ES6
  - "module": es2015 or es6
  - "outDir": directory root
  - rootDir
    - 웹팩에 의해 결정되어 필요 없다.

- webpack 설정

  - webpack.config.js 는 웹팩이 프로젝트 작업을 전달할 때, 자동적으로 찾게 되는 파일이다.
  - 웹팩이 자동적으로 확장자를 처리하므로, import에서 .js 확장자를 제거해야한다.

  ```js
  const path = require('path');

  module.exports = {
    entry: './src/app.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', 'js'],
    },
  };
  ```
