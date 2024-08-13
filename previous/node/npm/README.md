# NPM

## Build

- `npm init dash y`

## `outdated` 업데이트된 모듈 확인 및 `update` 업데이트

- `npm outdated`
- `npm update`

## 특정 버전 설치 및 제거

- ex) npm i lodash@4.0.0

- ex) npm i lodash@latest

  - 마지막 업데이트 버전 설치

- `npm uninstall`
  - 특정 패키지 제거

## 종속성 (Dependencies)

NPM을 사용하여, 패키지를 설치하면, 해당 패키지는 dependencies 객체에 나열된다.
이때, `--save`를 사용하면 dependencies을 명시적으로 저장할 수 있다.

# 개발 패키지

- `--save-dev`를 추가하면 개발환경에만 패키지를 사용할 수 있다.
